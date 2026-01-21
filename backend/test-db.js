require('dotenv').config();
const pool = require('./db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT 1 + 1 AS result');
    console.log('DB Connection OK:', result.rows[0].result); // should print 2
    process.exit(0);
  } catch (err) {
    console.error('DB Connection Failed:', err);
    process.exit(1);
  }
}
console.log('DB URL:', process.env.DATABASE_URL);
testConnection();
