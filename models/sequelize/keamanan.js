const { DataTypes } = require('sequelize');
const sequelizeDb = require('../../config/sequelize');

const KeamananModel = sequelizeDb.define('Keamanan', {
    id_keamanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    keamanan: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'keamanan', // Nama tabel di database
    timestamps: false,     // Tidak ada kolom createdAt dan updatedAt
});

module.exports = KeamananModel;
