// routes/kostRoutes.js
const express = require('express');
const { createKost, getAllKosts, getKostById, updateKost, deleteKost, getAllKostsByHarga } = require('../controllers/kostHandler');
const router = express.Router();
const multiUpload = require('../middleware/middlewareUpload');
const { isAdmin, verifyToken } = require('../config/auth');

router.post('/', multiUpload.array('photos'), verifyToken, isAdmin, createKost);
router.get('/', verifyToken, getAllKosts);
router.get('/harga', verifyToken, getAllKostsByHarga);
router.get('/:kost_id', verifyToken, getKostById);
router.put('/:kost_id', multiUpload.array('photos'), verifyToken, isAdmin, updateKost);
router.delete('/:kost_id', verifyToken, isAdmin, deleteKost);


module.exports = router;
