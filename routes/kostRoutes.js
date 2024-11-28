// routes/kostRoutes.js
const express = require('express');
const { createKost, getAllKosts, getKostById, updateKost, deleteKost } = require('../controllers/sequelize/kostHandler');
const router = express.Router();

router.post('/', createKost);
router.get('/', getAllKosts);
router.get('/:kost_id', getKostById);
router.put('/:kost_id', updateKost);
router.delete('/:kost_id', deleteKost);


module.exports = router;
