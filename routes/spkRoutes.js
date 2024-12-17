const express = require('express');
const { getSpkHandler } = require('../controllers/spkController');
const { verifyToken } = require('../config/auth');
const router = express.Router();

router.get('/kost', verifyToken, getSpkHandler );

module.exports = router;
