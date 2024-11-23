const Joi = require('joi'); // Pastikan menggunakan 'joi', bukan 'joy'

// Skema validasi untuk registrasi
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
});

// Skema validasi untuk login
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
