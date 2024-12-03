# BE-AppKost

**BE-AppKost** adalah backend untuk aplikasi pencarian kost berbasis SPK (Sistem Pendukung Keputusan). Proyek ini dibangun menggunakan Node.js dengan Express.js dan mengintegrasikan database MySQL. 

---


## Fitur Utama

- **Autentikasi**: Registrasi, login, dan manajemen token JWT.
- **Manajemen Data Kost**: CRUD untuk data kost.
- **Upload Gambar**: Menggunakan Multer dan Cloudinary untuk penyimpanan gambar.
- **Validasi Data**: Menggunakan Joi untuk validasi input.
- **Keamanan**: Enkripsi password dengan bcrypt/bcryptjs.
- **SPK**: Pengolahan data dengan metode yang dapat disesuaikan.

---


## Teknologi yang Digunakan

- **Express.js**: Framework utama untuk REST API.
- **Sequelize**: ORM untuk mengelola MySQL.
- **JWT**: Autentikasi berbasis token.
- **Multer**: Upload file.
- **Cloudinary**: Penyimpanan file cloud.
- **Dotenv**: Manajemen variabel lingkungan.

---


### Prasyarat

- Node.js (disarankan minimal versi 18)
- MySQL (terinstal dan berjalan)
- Git (untuk mengelola repositori)


### Langkah Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/khoerul10/be-appkost.git
   cd be-appkost

2. Instal dependensi:
   ```bash
   npm install

3. Konfigurasi file .env:
   Buat file .env di root folder dengan isi seperti .env.example

4. Migrasi database: Jalankan script untuk membuat atau memperbarui tabel database:
- konfigurasi database: (config/config.js : sesauikan dengan koneksi database)
- buat database: (buat )
   ```bash
   npx sequelize db:create

- buat tabel
   ```bash
   npx sequelize db:migrate

- seeder tabel
  ```bash

5. Menjalankan Server:

- Menggunakan nodemon (mode pengembangan): 
   ```bash
   nodemon server.js
     
- Atau secara langsung:
   ```bash
   npm start


## Script NPM 

- **npm install**: Instalasi semua dependensi.
- **nodemon server.js**: Menjalankan server dalam mode pengembangan.


## Kontak

Untuk pertanyaan, saran, atau informasi lainnya terkait proyek ini, silakan hubungi:

- **Email**: khoerulsarifudin01@gmail.com
- **GitHub**: khoerul10


Dokumen ini dirancang untuk mendukung pengembangan aplikasi pencarian kost berbasis SPK sebagai bagian dari proyek skripsi. Informasi yang disediakan bertujuan agar jelas, informatif, dan mudah dipahami oleh pembaca, baik untuk kebutuhan pengujian maupun pengembangan lebih lanjut. Silakan mengganti placeholder seperti URL GitHub dan informasi kontak sesuai kebutuhan proyek skripsi Anda.

## Struktur Proyek

```bash
be-appkost/
├── config/               # Konfigurasi database dan environment
├── controllers/          # Logika kontrol aplikasi
├── middleware/           # Middleware untuk autentikasi, validasi, dll.
├── models/               # Model Sequelize
├── routes/               # Rute API
├── utils/                # Fungsi utility
├── server.js             # File entry utama
└── .env.example          # Contoh file konfigurasi

