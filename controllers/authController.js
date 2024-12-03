const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const { loginSchema, registerSchema } = require('../schema/authSchema');
const db = require('../models');

// Fungsi untuk membuat token
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Login pengguna
const login = [
  async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res
        .status(HTTP_CODES.BAD_REQUEST.code)
        .json(formatResponse(HTTP_CODES.BAD_REQUEST, error.details[0].message));
    }

    const { username, password } = value;

    try {
      const user = await db.User.findOne({ where: { username } });

      if (!user) {
        return res
          .status(HTTP_CODES.BAD_REQUEST.code)
          .json(formatResponse(HTTP_CODES.BAD_REQUEST, "Username atau Password salah"));
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(HTTP_CODES.BAD_REQUEST.code)
          .json(formatResponse(HTTP_CODES.BAD_REQUEST, "Username atau Password salah"));
      }

      const accessToken = generateToken(
        { id: user.user_id, user: user.username, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        '1d' // Durasi diperpanjang
      );
      const refreshToken = generateToken(
        { id: user.user_id, role: user.role },
        process.env.JWT_REFRESH_SECRET_KEY,
        '7d' // Durasi lebih aman untuk refresh token
      );

      user.refreshToken = refreshToken;
      await user.save();

      return res.status(HTTP_CODES.SUCCESS.code).json(
        formatResponse(HTTP_CODES.SUCCESS, "Login berhasil", {
          accessToken,
          refreshToken,
        })
      );
    } catch (err) {
      return res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR.code)
        .json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error saat login"));
    }
  },
];

// Logout pengguna
const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(HTTP_CODES.BAD_REQUEST.code).json(
      formatResponse(HTTP_CODES.BAD_REQUEST, "Refresh token diperlukan")
    );
  }

  try {
    const user = await db.User.findOne({ where: { refreshToken } });

    if (!user) {
      return res.status(HTTP_CODES.FORBIDDEN.code).json(
        formatResponse(HTTP_CODES.FORBIDDEN, "Token tidak valid")
      );
    }

    user.refreshToken = null;
    await user.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, "Logout berhasil")
    );
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error saat logout")
    );
  }
};

// Registrasi pengguna
const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(HTTP_CODES.BAD_REQUEST.code).json({
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  const { username, password, email, role, phone, address, status } = value;

  try {
    const [existingUser, existingEmail] = await Promise.all([
      db.User.findOne({ where: { username } }),
      db.User.findOne({ where: { email } }),
    ]);

    if (existingUser) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json({
        message: "Username already exists",
      });
    }

    if (existingEmail) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Kompleksitas salt ditingkatkan

    const user = await db.User.create({
      username,
      password: hashedPassword,
      email,
      role,
      phone,
      address,
      status: status || "active",
    });

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, "User created successfully", {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        status: user.status,
      })
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, "Error creating user")
    );
  }
};

// Refresh access token
const refreshToken = async (req, res) => {
  const { token } = req.body;

  console.log('token', token)

  if (!token) {
    return res.status(HTTP_CODES.BAD_REQUEST.code).json(
      formatResponse(HTTP_CODES.BAD_REQUEST, "Token tidak ditemukan")
    );
  }

  try {
    const userPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);

    const user = await db.User.findOne({ where: { user_id: userPayload.id } });

    if (!user) {
      return res.status(HTTP_CODES.FORBIDDEN.code).json(
        formatResponse(HTTP_CODES.FORBIDDEN, "User tidak ditemukan")
      );
    }

    const newAccessToken = generateToken(
      { id: user.user_id, user: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      '1d' // Durasi diperpanjang
    );

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, "Token berhasil diperbarui", {
        accessToken: newAccessToken,
      })
    );
  } catch (err) {
    return res.status(HTTP_CODES.FORBIDDEN.code).json(
      formatResponse(HTTP_CODES.FORBIDDEN, "Token tidak valid")
    );
  }
};

module.exports = { login, register, logout, refreshToken };
