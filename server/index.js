require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');

// Inisialisasi Firebase Admin SDK sudah dihapus karena kita menggunakan MySQL untuk auth
// Jika nanti butuh Firebase Admin untuk fitur lain (misal notifikasi), bisa ditambahkan kembali.

const app = express();
app.use(cors());
app.use(express.json());

// Middleware untuk memverifikasi JWT buatan kita sendiri
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token tidak ditemukan' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    // Verifikasi Token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Pastikan user memiliki role admin
    if (decoded.role === 'admin') {
      req.user = decoded;
      next(); // Lolos, lanjutkan ke route
    } else {
      return res.status(403).json({ error: 'Forbidden: Anda bukan Admin!' });
    }
  } catch (error) {
    console.error('Error memverifikasi token:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Token tidak valid atau kedaluwarsa' });
  }
};

// ==========================================
// ENDPOINTS AUTHENTICATION (MySQL)
// ==========================================

// 1. Endpoint Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  try {
    // Cari user di database
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    const user = rows[0];

    // Cek password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Jika valid, buat JWT Token
    // Token ini menyimpan id, email, dan role user
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token berlaku 24 jam
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// ==========================================
// PROTECTED ENDPOINTS (ADMIN ONLY)
// ==========================================

// 2. Endpoint Tambah Admin Baru
app.post('/api/admin/users', verifyAdmin, async (req, res) => {
  const { email, password, role = 'admin' } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  try {
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.execute(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: 'Admin baru berhasil didaftarkan.',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Error saat tambah admin:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// 3. Endpoint Lihat Semua Admin
app.get('/api/admin/users', verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, email, role FROM users');
    res.json({ success: true, users: rows });
  } catch (error) {
    console.error('Error saat fetch admin:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// 4. Endpoint Ganti Password Admin
app.post('/api/admin/change-password', verifyAdmin, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Diambil dari JWT

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Password lama dan password baru wajib diisi' });
  }

  try {
    // Ambil data user
    const [rows] = await db.execute('SELECT password FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    const user = rows[0];

    // Cek password lama
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password lama salah' });
    }

    // Hash password baru dan update
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    console.error('Error saat ganti password:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// ==========================================
// OTHER PROTECTED ENDPOINTS
// ==========================================

// Route contoh yang HANYA bisa diakses oleh admin
app.get('/api/admin-data', verifyAdmin, (req, res) => {
  res.json({
    message: 'Selamat datang Admin!',
    data: {
      laporan: 120,
      penggunaBaru: 5
    }
  });
});

// Route verifikasi login untuk mengecek token masih valid
app.get('/api/verify-token', verifyAdmin, (req, res) => {
  // Jika middleware verifyAdmin lolos, berarti token valid
  res.json({ success: true, user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

