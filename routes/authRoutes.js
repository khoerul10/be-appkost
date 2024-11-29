// routes/authRoutes.js
const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.post('/login', login);
router.post('/register',upload.none(), register);

module.exports = router;
