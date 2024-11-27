const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/sequelize/user');
const { registerSchema, updateUserSchema } = require('../../schema/authSchema');
const { HTTP_CODES, formatResponse } = require('../../utils/responseFormatter');

// **Create User**
const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Validation error', {
          errors: error.details.map((err) => err.message),
        })
      );
    }

    const { username, password, email, role, phone, address, status } = value;

    // Check username and email uniqueness
    const [existingUser, existingEmail] = await Promise.all([
      UserModel.findOne({ where: { username } }),
      UserModel.findOne({ where: { email } }),
    ]);

    if (existingUser) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Username already exists'));
    }

    if (existingEmail) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Email already exists'));
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

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'User created successfully', {
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
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error creating user', { error: error.message })
    );
  }
};

// **Get All Users**
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  users));
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
    );
  }
};

// **Get Single User**
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'User not found'));
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '', user ));
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching user', { error: error.message })
    );
  }
};

// **Update User**
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Validation error', {
          errors: error.details.map((err) => err.message),
        })
      );
    }

    const updated = await UserModel.update(value, { where: { user_id: id } });

    if (updated[0] === 0) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'User not found or not updated'));
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'User updated successfully'));
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating user', { error: error.message })
    );
  }
};

// **Delete User**
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.destroy({ where: { user_id: id } });

    if (!deleted) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'User not found or already deleted'));
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'User deleted successfully'));
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting user', { error: error.message })
    );
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
