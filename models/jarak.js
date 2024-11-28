const { DataTypes } = require('sequelize');
const sequelizeDb = require('../config/sequelize');

const JarakModel = sequelizeDb.define('Jarak', {
    id_jarak: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jarak: {
        type: DataTypes.INTEGER,
    },
    bobot: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'jarak', // Nama tabel di database
    timestamps: false,  // Tidak ada kolom createdAt dan updatedAt
});

module.exports = JarakModel;
