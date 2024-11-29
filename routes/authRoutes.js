// routes/authRoutes.js
const express = require('express');
const { login, register, refreshToken, logout } = require('../controllers/authController');

const router = express.Router();

const multer = require('multer');
const upload = multer();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.post('/register',upload.none(), register);

module.exports = router;
