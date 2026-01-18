const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'scanqr',
  password: 'scanVerify@123',
  database: 'qr_verify',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
