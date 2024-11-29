const { DataTypes } = require('sequelize');
const sequelizeDb = require('../config/sequelize');

const LuaskamarModel = sequelizeDb.define('LuasKamar', {
    id_luas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    panjang: {
        type: DataTypes.INTEGER,
    },
    lebar: {
        type: DataTypes.INTEGER,
    },
    luas: {
        type: DataTypes.INTEGER,
    },
    bobot: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'luaskamar',
    timestamps: false,
});

module.exports = LuaskamarModel;
