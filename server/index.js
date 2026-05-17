require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 1. Inisialisasi Firebase Admin
// Kita menggunakan environment variables agar kredensial aman dan tidak bocor ke GitHub
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Perlu me-replace \n dengan newline karakter asli karena diread dari .env sebagai string
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
};

if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK berhasil diinisialisasi.');
} else {
  console.error('Peringatan: Kredensial Firebase tidak lengkap di .env');
}

const app = express();
app.use(cors());
app.use(express.json());

// Middleware untuk memverifikasi token dan memastikan pengguna adalah Admin
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token tidak ditemukan' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verifikasi ID Token Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userEmail = decodedToken.email;

    // Ambil daftar email admin dari .env
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];

    // Periksa apakah email pengguna ada di dalam daftar whitelist
    if (adminEmails.includes(userEmail)) {
      req.user = decodedToken;
      next(); // Lolos, lanjutkan ke route
    } else {
      return res.status(403).json({ error: 'Forbidden: Anda bukan Admin!' });
    }
  } catch (error) {
    console.error('Error memverifikasi token:', error);
    return res.status(401).json({ error: 'Unauthorized: Token tidak valid atau kedaluwarsa' });
  }
};

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

// Route login (opsional) - frontend biasanya langsung auth dengan Firebase Client SDK,
// lalu mengirimkan token ke backend melalui route yang diproteksi `verifyAdmin`.
app.post('/api/verify-login', verifyAdmin, (req, res) => {
  // Jika middleware verifyAdmin lolos, berarti login valid dan dia adalah admin
  res.json({ success: true, message: 'Login Admin berhasil diverifikasi', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
