const { DataTypes } = require('sequelize');
const sequelizeDb = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid'); 

const UserModel = sequelizeDb.define('User', {
  user_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    defaultValue: () => uuidv4(), // untuk menghasilkan UUID secara otomatis
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = UserModel;
