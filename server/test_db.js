import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await pool.query('select 1 as ok');
    console.log('DB connected:', result.rows);
    await pool.end();
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
}

testConnection();
