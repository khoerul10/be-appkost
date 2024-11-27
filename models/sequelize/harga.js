const { DataTypes } = require('sequelize');
const sequelizeDb = require('../../config/sequelize');

const HargaModel = sequelizeDb.define('Harga', {
    harga_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    range_harga: {
        type: DataTypes.INTEGER,
    },
    min_harga: {
        type: DataTypes.INTEGER,
    },
    max_harga: {
        type: DataTypes.INTEGER,
    },
    // Kolom lainnya sesuai dengan struktur tabel
}, {
    tableName: 'harga', // Nama tabel dalam database
    timestamps: false,  // Nonaktifkan jika tabel tidak memiliki createdAt dan updatedAt
});

module.exports = HargaModel;
