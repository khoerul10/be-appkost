const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const { loginSchema, registerSchema } = require('../schema/authSchema');
const UserModel = require('../models/sequelize/user');


// Login pengguna
const login = [
    async (req, res) => {
        const { error, value } = loginSchema.validate(req.body);

        // Validasi input menggunakan Joi
        if (error) {
            return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                formatResponse(HTTP_CODES.BAD_REQUEST, error.details[0].message)
            );
        }

        const { username, password } = value;

        try {
            // Menggunakan Sequelize untuk mencari user berdasarkan username
            const user = await UserModel.findOne({ where: { username } });

            // username salah
            if (!user) {
                return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                    formatResponse(HTTP_CODES.BAD_REQUEST, "Username atau Password yang Anda masukkan salah")
                );
            }

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
    }
];

const register = async (req, res) => {
    try {
      const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.details.map((err) => err.message),
        });
      }
  
      const { username, password, email, role, phone, address, status } = value;
  
      // Check username and email uniqueness
      const [existingUser, existingEmail] = await Promise.all([
        UserModel.findOne({ where: { username } }),
        UserModel.findOne({ where: { email } }),
      ]);
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await UserModel.create({
        user_id: uuidv4(),
        username,
        password: hashedPassword,
        email,
        role,
        phone,
        address,
        status: status || 'active', // Default status
      });
  
      res.status(201).json({
        message: 'User created successfully',
        data: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          status: user.status,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating user',
        error: error.message,
      });
    }
  };
  

module.exports = { register, login };
