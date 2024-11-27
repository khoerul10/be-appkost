const { DataTypes } = require('sequelize');
const sequelizeDb = require('../../config/sequelize');

const LuasKamar = sequelizeDb.define('LuasKamar', {
    id_luas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    luas: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'luaskamar',
    timestamps: false,
});

module.exports = LuasKamar;
