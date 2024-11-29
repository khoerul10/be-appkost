const express = require('express');
const router = express.Router();
const { createRekomendasi, getRekomendasiByUser, deleteRekomendasi, getRekomendasi } = require('../controllers/rekomendasiController');
const { verifyToken, isAdmin } = require('../config/auth');
const multer = require('multer');
const upload = multer(); // Konfigurasi default untuk parsing `multipart/form-data`

router.post('/', upload.none(), verifyToken, createRekomendasi);
router.get('/', verifyToken, getRekomendasiByUser);
router.delete('/:id_rekomendasi', verifyToken, deleteRekomendasi);
router.get('/admin', verifyToken, isAdmin, getRekomendasi);
router.delete('/admin/:id_rekomendasi', verifyToken, isAdmin, deleteRekomendasi);

module.exports = router;
