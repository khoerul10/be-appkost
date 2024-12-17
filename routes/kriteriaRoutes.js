// routes/kostRoutes.js
const express = require('express');
const { verifyToken, isAdmin } = require('../config/auth');
const router = express.Router();
const multer = require('multer');
const {
    getFasilitasHandler,
    getFasilitasByIdHandler,
    deleteFasilitasHandler,
    addFasilitasHandler,
    updateFasilitasHandler
} = require('../controllers/fasilitasHandler');
const { getHargaHandler, getHargaByIdHandler, addHargaHandler, updateHargaHandler, deleteHargaHandler } = require('../controllers/hargaHandler');
const { getJarakHandler, getJarakByIdHandler, addJarakHandler, updateJarakHandler, deleteJarakHandler } = require('../controllers/jarakHandler');
const { getKeamananHandler, getKeamananByIdHandler, addKeamananHandler, updateKeamananHandler, deleteKeamananHandler } = require('../controllers/keamananHandler');
const { getLuasKamarHandler, getLuastKamarByIdHandler, addLuasKamarHandler, updateLuasKamarHandler, deleteLuasKamarHandler } = require('../controllers/luasKamarHandler');
const upload = multer(); // Konfigurasi default untuk parsing `multipart/form-data`

//fasilitas 
router.get('/fasilitas', verifyToken, getFasilitasHandler);
router.get('/fasilitas/:id', verifyToken, getFasilitasByIdHandler);
router.post('/fasilitas', upload.none(), verifyToken, addFasilitasHandler);
router.post('/fasilitas/:id', upload.none(), verifyToken, updateFasilitasHandler);
router.delete('/fasilitas/:id', verifyToken, deleteFasilitasHandler);

// harga
router.get('/harga', verifyToken, isAdmin, getHargaHandler);
router.get('/harga/:id', verifyToken, getHargaByIdHandler);
router.post('/harga', upload.none(), verifyToken, addHargaHandler);
router.post('/harga/:id', upload.none(), verifyToken, updateHargaHandler);
router.delete('/harga/:id', verifyToken, deleteHargaHandler);

// keamanan
router.get('/keamanan', verifyToken, isAdmin, getKeamananHandler);
router.get('/keamanan/:id', verifyToken, getKeamananByIdHandler);
router.post('/keamanan', upload.none(), verifyToken, addKeamananHandler);
router.post('/keamanan/:id', upload.none(), verifyToken, updateKeamananHandler);
router.delete('/keamanan/:id', verifyToken, deleteKeamananHandler);

// jarak
router.get('/jarak', verifyToken, isAdmin, getJarakHandler);
router.get('/jarak/:id', verifyToken, getJarakByIdHandler);
router.post('/jarak', upload.none(), verifyToken, addJarakHandler);
router.post('/jarak/:id', upload.none(), verifyToken, updateJarakHandler);
router.delete('/jarak/:id', verifyToken, deleteJarakHandler);

// luaskamar
router.get('/luaskamar', verifyToken, isAdmin, getLuasKamarHandler);
router.get('/luaskamar/:id', verifyToken, getLuastKamarByIdHandler);
router.post('/luaskamar', upload.none(), verifyToken, addLuasKamarHandler);
router.post('/luaskamar/:id', upload.none(), verifyToken, updateLuasKamarHandler);
router.delete('/luaskamar/:id', verifyToken, deleteLuasKamarHandler);


module.exports = router;
