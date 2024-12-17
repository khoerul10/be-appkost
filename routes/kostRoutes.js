// routes/kostRoutes.js
const express = require('express');
const { createKost, getAllKosts, getKostById, updateKost, deleteKost, getAllKostsByHarga } = require('../controllers/kostHandler');
const router = express.Router();
const multiUpload = require('../middleware/middlewareUpload');

router.post('/', multiUpload.array('photos'), createKost);
router.get('/', getAllKosts);
router.get('/harga', getAllKostsByHarga);
router.get('/:kost_id', getKostById);
router.put('/:kost_id', multiUpload.array('photos'), updateKost);
router.delete('/:kost_id', deleteKost);


module.exports = router;
