import { RequestHandler } from 'express';
import { ServerError } from '../types';

import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const TABLE = 'twitch_streamers';

function validationSql(rawsql: string) {
  const sql = (rawsql || '').trim();
  const lower = sql.toLocaleLowerCase();

  if (!sql) return { ok: false as const, error: 'empty sql' };
  if (lower.includes(';')) return { ok: false as const, error: 'Semicolons are not allowed' };
  if (!lower.startsWith('select')) return { ok: false as const, error: 'Only SELECT queries are allowed' };

  const blocked = [
    'insert',
    'update',
    'delete',
    'drop',
    'alert',
    'create',
    'grant',
    'revoke',
  ];

  for (const word of blocked) {
    if (lower.includes(word)) {
      return { ok: false as const, error: `Blocked keyword: ${word}` };
    }
  }
  if (!lower.includes(`from ${TABLE}`)) {
    return { ok: false as const, error: `Only table '${TABLE}' is allowed` };
  }
  return {ok: true as const, sql}
}

export const queryDatabase: RequestHandler = async (req, res, next) => {
  try {
    const { sql} = req.body;
    if (!sql) {
      return res.status(400).json({error:' sql is required'})
    }

    const checked = validationSql(sql);
    if(!checked.ok){
      return res.status(400).json({error: checked.error, sql});
    }

    const results = await pool.query(checked.sql);
    return res.json({sql: checked.sql, rows: results.rows});
    
  } catch (err:any) {
    console.error(err);
    return res.status(500).json({error: 'database query fail', details: err.message})
  }
};

