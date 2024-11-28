const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../config/auth');

const router = express.Router();
// isAdmin,
// Routes
router.post('/', verifyToken, isAdmin, createUser); // Create
router.get('/', getUsers); // Read All
router.get('/:id', getUserById); // Read Single
router.put('/:id', verifyToken, isAdmin, updateUser); // Update
router.delete('/:id', deleteUser); // Delete

module.exports = router;
