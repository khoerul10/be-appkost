const Joi = require('joi'); 
const { v4: uuidv4 } = require('uuid');

// Skema validasi untuk registrasi
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
    phone: Joi.string().max(15).allow(null, ''),
    address: Joi.string().allow(null, ''),
    status: Joi.string().valid('active', 'inactive').default('active'),
});

// Skema validasi untuk login
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
