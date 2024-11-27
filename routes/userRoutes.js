const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/sequelize/userController');
const multer = require('multer');
const { verifyToken, isAdmin } = require('../config/auth');
const upload = multer();

const router = express.Router();
// isAdmin,
// Routes
router.post('/', upload.none(), verifyToken, isAdmin, createUser); // Create
router.get('/', getUsers); // Read All
router.get('/:id', getUserById); // Read Single
router.put('/:id', upload.none(), verifyToken, isAdmin, updateUser); // Update
router.delete('/:id', deleteUser); // Delete

module.exports = router;
