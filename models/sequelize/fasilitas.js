const { DataTypes } = require('sequelize');
const sequelizeDb = require('../../config/sequelize');

const FasilitasModel = sequelizeDb.define('Fasilitas', {
    id_fasilitas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fasilitas: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'fasilitas',
    timestamps: false,
});


module.exports = FasilitasModel;
