// routes/kostRoutes.js
const express = require('express');
const { verifyToken } = require('../config/auth');
const { getFasilitasHandler, getHargaHandler, getKeamananHandler, getJarakHandler, getLuasKamarHandler } = require('../controllers/kriteriaController');
const router = express.Router();

router.get('/fasilitas', verifyToken, getFasilitasHandler);
router.get('/harga', verifyToken, getHargaHandler);
router.get('/jarak', verifyToken, getJarakHandler);
router.get('/luaskamar', verifyToken, getLuasKamarHandler);
router.get('/keamanan', verifyToken, getKeamananHandler);


module.exports = router;
