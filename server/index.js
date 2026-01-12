import express from 'express';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('sel aect 1s ok');
    res.json({ db: result.rows[0].ok });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.post('/api/sql-test', async (req, res) => {
  try {
    const result = await pool.query('select * from twitch_streamers limit 5');
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
