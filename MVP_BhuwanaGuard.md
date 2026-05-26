# 🌿 MVP Fitur: Bhuwana Guard

Berdasarkan struktur proyek saat ini, berikut adalah rincian fitur Minimum Viable Product (MVP) untuk platform **Bhuwana Guard** yang terbagi menjadi 3 bagian utama:

## 1. 🌐 Portal Publik (Public Facing)
Fokus pada pemberian informasi, edukasi masyarakat, serta transparansi.

*   **Beranda (Home):** Halaman pendaratan (*landing page*) yang memberikan kesan pertama, ringkasan layanan, serta ajakan tindakan (*call to action*).
*   **Tentang Kami (About):** Halaman informasi mengenai visi, misi, dan latar belakang Bhuwana Guard.
*   **Modul Edukasi (Edukasi & Edukasi Detail):** 
    *   Pusat informasi mengenai mitigasi bencana alam.
    *   Panduan penanganan dan edukasi tentang perlindungan satwa.
*   **Peta Rawan (Peta Rawan):** Peta interaktif publik untuk melihat zona rawan bencana atau area rawan konflik satwa liar.
*   **Portal Relawan (Relawan):** Halaman khusus untuk menjaring partisipasi masyarakat atau pendaftaran menjadi relawan tanggap bencana/satwa.

## 2. 🔐 Sistem Autentikasi
*   **Login Aman (Login):** Portal masuk yang diamankan untuk membatasi akses ke fitur manajemen bagi Admin atau Petugas berwenang.

## 3. 🎛️ Admin Panel (Command Centre)
Fokus pada pengelolaan data operasional, pemantauan *real-time*, dan pengambilan keputusan.

*   **Dashboard Utama (Admin Dashboard):** Pusat komando yang menampilkan metrik kunci (seperti jumlah laporan hari ini, status peringatan), serta ringkasan aktivitas dalam sekilas.
*   **Manajemen Laporan (Manajemen Laporan):** 
    *   Tampilan *split-screen* untuk meninjau detail laporan dari masyarakat secara efisien.
    *   Fitur penugasan (delegasi/push tugas) ke tim lapangan (aplikasi mobile).
*   **Sistem Peringatan (Sistem Peringatan):** 
    *   Pemantauan *alert real-time* (peringatan dini).
    *   Tabel riwayat aktivitas dan status bahaya terkini.
*   **Statistik & Pemetaan (Statistik):** Visualisasi data lanjutan menggunakan peta interaktif (*Leaflet*) dan grafik (*Donut Chart* dll) untuk analisis tren laporan & bencana.
*   **Manajemen Akun (Manajemen Akun):** Fitur untuk membuat, mengedit, dan menghapus hak akses bagi staf admin maupun petugas lapangan.

---
*Catatan: Dokumen MVP ini disusun berdasarkan analisis komponen halaman (pages) yang telah dikembangkan di direktori `client/src/pages` pada repositori Bhuwana Guard.*
