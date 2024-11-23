// routes/kostRoutes.js
const express = require('express');
const { createKost, getKostsHandler, getKostByIdHandler } = require('../controllers/kostController');
const { verifyToken } = require('../config/auth');
const router = express.Router();

router.post('/', verifyToken, createKost);
router.get('/', getKostsHandler);
router.get('/:id', getKostByIdHandler);

module.exports = router;
