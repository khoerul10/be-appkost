// routes/kostRoutes.js
const express = require('express');
const { getImageHandler, postImageHandler, postMultiImageHandler } = require('../controllers/imageController');
const router = express.Router();

router.get('/', getImageHandler);
router.post('/upload', postImageHandler);
router.post('/uploadmulti', postMultiImageHandler);

module.exports = router;
