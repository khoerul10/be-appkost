const { DataTypes } = require('sequelize');
const sequelizeDb = require('../config/sequelize');

const UserModel = sequelizeDb.define('User', {
  user_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
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
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = UserModel;
