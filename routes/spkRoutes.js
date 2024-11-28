const express = require('express');
const { getSpkHandler } = require('../controllers/spkController');
const router = express.Router();

router.get('/kost', getSpkHandler );

module.exports = router;
