const pool = require('./db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('DB Connection OK:', rows[0].result); // should print 2
  } catch (err) {
    console.error('DB Connection Failed:', err);
  }
}

testConnection();
