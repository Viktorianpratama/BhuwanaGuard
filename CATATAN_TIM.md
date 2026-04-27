# 🌿 Bhuwana Guard - Frontend Documentation

Halo gesss! Ini adalah panduan singkat jika kalian baru saja melakukan *clone* pada proyek ini dan ingin menjalankannya di komputer lokal, beserta struktur komponen yang sudah dibangun sejauh ini.

## 🚀 Cara Menjalankan Proyek (Setup & Run)

1. **Pastikan Node.js Terinstal**
   Pastikan kalian sudah menginstal Node.js di komputer masing-masing.

2. **Clone Repository**
   ```bash
   git clone https://github.com/ViktorPratama/BhuwanaGuard.git
   cd BhuwanaGuard
   ```

3. **Masuk ke Folder Client**
   Karena ini adalah repositori *monorepo* atau memiliki folder terpisah, seluruh pengerjaan antarmuka (*frontend*) ada di folder `client`.
   ```bash
   cd client
   ```

4. **Instal Dependensi**
   Instal semua pustaka yang dibutuhkan (seperti React, Tailwind, Leaflet, Lucide, dll).
   ```bash
   npm install
   ```

5. **Jalankan Server Development (Vite)**
   ```bash
   npm run dev
   ```

6. **Buka di Browser**
   Buka tautan yang muncul di terminal (biasanya `http://localhost:5173`).
   - Tampilan Pengguna Publik: `/`
   - Tampilan Admin Panel: `/admin`
   - Halaman Login: `/login`

---

## 📂 Struktur Pohon Komponen (Component Tree)

Berikut adalah ringkasan struktur map dan file *React Components* yang telah dikembangkan di dalam direktori `client/src/`:

```text
client/
└── src/
    ├── App.jsx                  // Pengatur seluruh rute aplikasi (Routing)
    ├── main.jsx                 // Entry point utama React & import CSS Global
    ├── index.css                // File CSS global & import direktif Tailwind v4
    │
    ├── components/              // Komponen-komponen UI yang dapat digunakan berulang (Reusable)
    │   ├── Button.jsx           // Tombol kustom aplikasi
    │   ├── Footer.jsx           // Bagian bawah halaman website umum (User)
    │   ├── Navbar.jsx           // Navigasi atas (Navbar) dengan desain "Floating Glassmorphism"
    │   └── Sidebar.jsx          // Menu samping putih bersih khusus halaman Admin
    │
    ├── layouts/                 // Pembungkus tata letak kerangka dasar (Wrapper)
    │   ├── AdminLayout.jsx      // Tata letak halaman Admin (Membungkus Sidebar + Area Konten)
    │   └── UserLayout.jsx       // Tata letak halaman Publik (Membungkus Navbar + Konten + Footer)
    │
    └── pages/                   // Halaman Penuh (Views/Screens)
        ├── Home.jsx             // Halaman Beranda (Landing Page Publik)
        ├── Edukasi.jsx          // Halaman Edukasi Satwa & Bencana (Publik)
        ├── Login.jsx            // Halaman Login yang diperbarui dengan Logo Besar
        │
        {  AREA ADMIN PANEL  }
        ├── AdminDashboard.jsx   // Command Centre (Menampilkan 4 Statistik & Ringkasan Harian)
        ├── ManajemenLaporan.jsx // Fitur Split-Screen daftar laporan & push tugas ke Mobile
        ├── SistemPeringatan.jsx // Alert Real-time (Kotak peringatan & Tabel Aktivitas)
        └── Statistik.jsx        // Visualisasi Data (Peta Interaktif Leaflet & SVG Donut Chart)
```

## 🛠️ Library Utama yang Digunakan
- **Tailwind CSS v4:** Untuk *styling layout*, warna, responsivitas, dan estetika premium secara cepat.
- **Lucide React:** Untuk penyediaan set ikon antarmuka yang bersih dan modern.
- **React Router Dom:** Untuk navigasi antar halaman (SPA - *Single Page Application*) tanpa memuat ulang layar.
- **React Leaflet & Leaflet:** Untuk merender peta geografis interaktif di halaman Statistik.
