const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); // Import konfigurasi Cloudinary

// Konfigurasi Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kost_photos', // Folder tujuan di Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Format file yang diperbolehkan
  },
});

const multiUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas maksimal ukuran file (2MB)
});

module.exports = multiUpload;
