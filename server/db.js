const mysql = require('mysql2/promise');
require('dotenv').config();

// CONNECT mysql
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_bhuwanaguard',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi
pool.getConnection()
  .then(connection => {
    console.log('Berhasil terhubung ke database MySQL (Laragon)');
    connection.release();
  })
  .catch(err => {
    console.error('Gagal terhubung ke database MySQL:', err.message);
    console.error('Pastikan Laragon (MySQL) sudah menyala dan nama database benar.');
  });

module.exports = pool;
