// routes/authRoutes.js
const express = require('express');
const { login, register } = require('../controllers/authController');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);

module.exports = router;
