// routes/kostRoutes.js
const express = require('express');
const { createKost, getAllKosts, getKostById, updateKost, deleteKost } = require('../controllers/kostHandler');
const router = express.Router();
const multiUpload = require('../middleware/middlewareUpload');

router.post('/', multiUpload.array('photos'), createKost);
router.get('/', getAllKosts);
router.get('/:kost_id', getKostById);
router.put('/:kost_id', updateKost);
router.delete('/:kost_id', deleteKost);


module.exports = router;
