const fs = require('fs');
const path = require('path');

// Pastikan folder upload ada
const uploadDir = path.join(__dirname, 'assets', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const multer = require('multer');

// Menentukan lokasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Menyimpan file di dalam folder assets/uploads/
        cb(null, uploadDir);  // Menggunakan folder yang sudah dipastikan ada
    },
    filename: (req, file, cb) => {
        // Menyimpan file dengan nama unik berdasarkan waktu dan nama asli
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Konfigurasi Multer dengan batas ukuran file dan filter jenis file
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // Batas ukuran file 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Jenis file yang diizinkan
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);  // Izinkan file
        } else {
            cb(new Error('Hanya file gambar yang diizinkan!'), false);  // Tolak file yang tidak diizinkan
        }
    }
});

module.exports = upload;
