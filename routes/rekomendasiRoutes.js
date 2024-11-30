const express = require('express');
const router = express.Router();
const { createRekomendasi, getRekomendasiByUser, deleteRekomendasi, getRekomendasiByKost, getRekomendasiByFavorit, getRekomendasiIsAdmin } = require('../controllers/rekomendasiController');
const { verifyToken, isAdmin } = require('../config/auth');
const multer = require('multer');
const upload = multer(); // Konfigurasi default untuk parsing `multipart/form-data`

router.post('/', upload.none(), verifyToken, createRekomendasi);
router.get('/', verifyToken, getRekomendasiByUser);
router.get('/favorit', verifyToken, getRekomendasiByFavorit);
router.get('/kost/:kost_id', verifyToken, getRekomendasiByKost);
router.get('/admin/', verifyToken, getRekomendasiIsAdmin);
router.delete('/:id_rekomendasi', verifyToken, deleteRekomendasi);
router.delete('/admin/:id_rekomendasi', verifyToken, isAdmin, deleteRekomendasi);

module.exports = router;
