// routes/criteriaRoutes.js
const express = require('express');
const { getCriteria, addCriteria } = require('../controllers/criteriaController');
const { verifyToken, isAdmin } = require('../config/auth');
const router = express.Router();

router.get('/', verifyToken, getCriteria);
router.post('/', verifyToken, isAdmin, addCriteria);

module.exports = router;
