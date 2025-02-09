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
router.post('/fasilitas', upload.none(), verifyToken, isAdmin, addFasilitasHandler);
router.put('/fasilitas/:id', upload.none(), verifyToken, isAdmin, updateFasilitasHandler);
router.delete('/fasilitas/:id', verifyToken, isAdmin, deleteFasilitasHandler);

// harga
router.get('/harga', verifyToken, getHargaHandler);
router.get('/harga/:id', verifyToken, getHargaByIdHandler);
router.post('/harga', upload.none(), verifyToken, isAdmin, addHargaHandler);
router.put('/harga/:id', upload.none(), verifyToken, isAdmin, updateHargaHandler);
router.delete('/harga/:id', verifyToken, isAdmin, deleteHargaHandler);

// keamanan
router.get('/keamanan', verifyToken, getKeamananHandler);
router.get('/keamanan/:id', verifyToken, getKeamananByIdHandler);
router.post('/keamanan', upload.none(), verifyToken, isAdmin, addKeamananHandler);
router.put('/keamanan/:id', upload.none(), verifyToken, isAdmin, updateKeamananHandler);
router.delete('/keamanan/:id', verifyToken, isAdmin, deleteKeamananHandler);

// jarak
router.get('/jarak', verifyToken, getJarakHandler);
router.get('/jarak/:id', verifyToken, getJarakByIdHandler);
router.post('/jarak', upload.none(), verifyToken, isAdmin, addJarakHandler);
router.put('/jarak/:id', upload.none(), verifyToken, isAdmin, updateJarakHandler);
router.delete('/jarak/:id', verifyToken, isAdmin, deleteJarakHandler);

// luaskamar
router.get('/luaskamar', verifyToken, getLuasKamarHandler);
router.get('/luaskamar/:id', verifyToken, getLuastKamarByIdHandler);
router.post('/luaskamar', upload.none(), verifyToken, isAdmin, addLuasKamarHandler);
router.put('/luaskamar/:id', upload.none(), verifyToken, isAdmin, updateLuasKamarHandler);
router.delete('/luaskamar/:id', verifyToken, isAdmin, deleteLuasKamarHandler);


module.exports = router;
