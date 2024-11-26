const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const { registerSchema, loginSchema } = require('../schema/authSchema');

const upload = multer();

// Registrasi pengguna
const { v4: uuidv4 } = require('uuid'); // Import uuid

// Registrasi pengguna
const register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);

    // Validasi input menggunakan Joi.js
    if (error) {
        return res.status(HTTP_CODES.BAD_REQUEST.code).json(
            formatResponse(HTTP_CODES.BAD_REQUEST, error.details[0].message)
        );
    }

    const { username, password, email, role } = value;

    // Mengecek apakah username sudah ada di database
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], async (err, result) => {
        if (err) {
            console.error("Error checking username:", err);  // Log error database
            return res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error checking username"));
        }

        if (result.length > 0) {
            return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                formatResponse(HTTP_CODES.BAD_REQUEST, "Username sudah terdaftar")
            );
        }

        // Generate user_id menggunakan uuid
        const user_id = uuidv4();

        // Hash password dan simpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (user_id, username, password, email, role) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [user_id, username, hashedPassword, email, role], (err, result) => {
            if (err) {
                console.error("Error registering user:", err);  // Log error database
                return res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error registering user"));
            }

            res.status(HTTP_CODES.CREATED.code).json(
                formatResponse(HTTP_CODES.CREATED, "User registered successfully")
            );
        });
    });
};



// Login pengguna
const login = [
    upload.none(), // Middleware untuk mem-parsing multipart/form-data tanpa file
    async (req, res) => {
        const { error, value } = loginSchema.validate(req.body);

        // Validasi input menggunakan Joi
        if (error) {
            return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                formatResponse(HTTP_CODES.BAD_REQUEST, error.details[0].message)
            );
        }

        const { username, password } = value;

        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], async (err, result) => {
            // username salah
            if (err || result.length === 0) {
                return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                    formatResponse(HTTP_CODES.BAD_REQUEST, "Username atau Password yang Anda masukkan salah")
                );
            }

            const user = result[0];
            try {
                const isMatch = await bcrypt.compare(password, user.password);

                // password salah
                if (!isMatch) {
                    return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                        formatResponse(HTTP_CODES.BAD_REQUEST, "Username atau Password yang Anda masukkan salah")
                    );
                }

                if (!process.env.JWT_SECRET_KEY) {
                    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
                        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Konfigurasi JWT Secret tidak ditemukan")
                    );
                }
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                return res.status(HTTP_CODES.SUCCESS.code).json(
                    formatResponse(HTTP_CODES.SUCCESS, "Login berhasil", {
                        user: { username: user.username, email: user.email, role: user.role },
                        token: token
                    })
                );
            } catch (err) {
                return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
                    formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error comparing passwords")
                );
            }
        });
    }
];

module.exports = { register, login };
