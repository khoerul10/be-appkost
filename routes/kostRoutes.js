// routes/kostRoutes.js
const express = require('express');
const { createKost, getAllKosts, getKostById, updateKost, deleteKost, getAllKostsByHarga } = require('../controllers/kostHandler');
const router = express.Router();
const multiUpload = require('../middleware/middlewareUpload');
const { isAdmin } = require('../config/auth');

router.post('/', multiUpload.array('photos'), isAdmin, createKost);
router.get('/', getAllKosts);
router.get('/harga', getAllKostsByHarga);
router.get('/:kost_id', getKostById);
router.put('/:kost_id', multiUpload.array('photos'), isAdmin, updateKost);
router.delete('/:kost_id', isAdmin, deleteKost);


module.exports = router;
