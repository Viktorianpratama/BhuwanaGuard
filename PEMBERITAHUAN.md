Teman teman kalau aku kasih beberapa cara ya command command dari GIT apa aja untuk clone kah atau untuk push atau bakal pull :

# 🛡️ Panduan Kerja Tim - BhuwanaGuard

Dokumen ini berisi panduan standar bagi anggota tim agar proses pengembangan kode tetap sinkron dan terhindar dari bentrok kode (*merge conflict*).

---

## 1. Persiapan Awal
Jika kamu baru bergabung, lakukan clone repository ke komputer lokal:
```bash
git clone https://github.com/ViktorPratama/BhuwanaGuard.git
cd BhuwanaGuard
```

---

## 2. Alur Kerja Harian (Sangat Penting!)

### 🔄 Langkah 1: Ambil Update Terbaru (Pagi/Sebelum Kerja)
Sebelum kamu mulai mengetik kode baru, pastikan kamu mengambil pekerjaan terbaru dari teman tim yang mungkin sudah di-push:
```bash
git pull origin main
```
> **Mengapa?** Agar kode kamu tidak ketinggalan zaman (*outdated*) dan mengurangi risiko bentrok saat push nanti.

### 📝 Langkah 2: Menandai & Menyimpan Perubahan
Setelah selesai membuat fitur atau memperbaiki bug, simpan perubahanmu secara lokal:
```bash
# 1. Cek file apa saja yang berubah
git status

# 2. Tandai semua file untuk dikirim
git add .

# 3. Beri catatan singkat tentang apa yang kamu ubah
git commit -m "Deskripsi perubahan kamu (contoh: Menambah fitur login)"
```

### 🚀 Langkah 3: Mengirim ke GitHub
Kirim hasil kerjamu agar bisa dilihat dan digunakan oleh teman yang lain:
```bash
git push origin main
```
Nah disini kalau kalian mau push usahakan info dlu di group atau chat biar kita tau siapa aja yang baru push agar bisa di Pull
---

## 3. Menangani "Rejected" atau "Conflict"

Jika saat kamu melakukan `git push` muncul pesan error **[rejected]**, itu artinya ada temanmu yang sudah melakukan push duluan.

**Solusinya:**
1. Lakukan `git pull origin main` terlebih dahulu.
2. Jika ada tulisan **"Automatic merge failed"**, buka file yang bermasalah (biasanya ada tanda `<<<<<<<` dan `>>>>>>>`).
3. Pilih kode mana yang mau dipakai, hapus tanda-tanda tersebut, lalu simpan filenya.
4. Lakukan kembali: `git add .` -> `git commit` -> `git push`.

---

## 💡 Tips Agar Kerja Tim Lancar
1. **Sering-sering Pull:** Semakin sering kamu `pull`, semakin kecil kemungkinan kamu terkena *conflict* besar.
2. **Commit yang Jelas:** Gunakan pesan commit yang mudah dimengerti teman tim.
3. **Komunikasi:** Jika kamu ingin mengubah file inti yang krusial, beri tahu tim di grup koordinasi agar yang lain waspada.



--- INI GA WAJIB KALIAN YA ----

## 🌿 4. Menggunakan Branch (Bekerja di Jalur Berbeda)
Agar tidak saling mengganggu file utama (`main`), setiap anggota tim disarankan membuat "jalur" sendiri saat mengerjakan fitur baru.

### Cara Membuat Fitur Baru:
1. **Buat Branch baru & pindah ke sana:**
   ```bash
   git checkout -b nama-fitur-kamu
   ```
   *Contoh: `git checkout -b fitur-autentikasi`*

2. **Bekerja & Commit seperti biasa:**
   ```bash
   git add .
   git commit -m "Menyelesaikan fitur autentikasi"
   ```

3. **Push Branch kamu ke GitHub:**
   ```bash
   git push origin nama-fitur-kamu
   ```

### Cara Menggabungkan ke Main (Merge):
Jika fitur di branch kamu sudah selesai dan sudah dites:
1. Pindah kembali ke main: `git checkout main`
2. Ambil update terbaru: `git pull origin main`
3. Gabungkan branch fitur: `git merge nama-fitur-kamu`
4. Kirim hasil gabungan: `git push origin main`
5. Hapus branch lokal jika sudah tidak dipakai: `git branch -d nama-fitur-kamu`


Aku pake master ya
---
