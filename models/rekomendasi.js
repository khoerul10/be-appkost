const { DataTypes } = require('sequelize');
const sequelizeDb = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid'); 

const RekomendasiModel = sequelizeDb.define('Rekomendasi', {
    id_rekomendasi: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        defaultValue: () => uuidv4(), // untuk menghasilkan UUID secara otomatis
    },
    kost_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // mencatat waktu pembuatan entri
    },
}, {
    tableName: 'rekomendasi',
    timestamps: false, // jika tidak ingin menggunakan timestamps otomatis (createdAt, updatedAt)
});

module.exports = RekomendasiModel;
