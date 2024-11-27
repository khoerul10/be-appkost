const { DataTypes } = require('sequelize');
const sequelizeDb = require('../../config/sequelize');
const { v4: uuidv4 } = require('uuid'); 

const KostModel = sequelizeDb.define('Kost', {
  kost_id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  nama_kost: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  jenis_kost: {
    type: DataTypes.ENUM('pria', 'wanita', 'campur'),
    allowNull: true,
  },
  harga: {
    type: DataTypes.STRING(225),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('tersedia', 'tidak tersedia'),
    allowNull: true,
  },
  photos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  harga_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fasilitas_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  jarak_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  keamanan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  thumb_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'kost',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = KostModel;
