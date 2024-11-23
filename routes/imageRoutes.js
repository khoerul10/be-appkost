const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');  // Mengimpor middleware Multer
const imageController = require('../controllers/imageController');

// Rute untuk upload gambar menggunakan middleware Multer
router.post('/upload', upload.single('gambar'), imageController.uploadImage);

module.exports = router;
