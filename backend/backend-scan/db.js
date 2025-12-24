const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'qr_user',
  password: 'qr_pass123',
  database: 'qr_verification',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
