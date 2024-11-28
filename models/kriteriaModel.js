const HargaModel = require('./harga');
const KeamananModel = require('./keamanan');
const JarakModel = require('./jarak');
const LuasKamar = require('./luaskamar');
const FasilitasModel = require('./fasilitas');
const { Sequelize } = require('sequelize');

const getHarga = (input_harga) => {
    return HargaModel.findAll({
        where: {
            [Sequelize.Op.and]: [
                {
                    min_harga: {
                        [Sequelize.Op.lte]: input_harga, // min_harga harus lebih kecil atau sama dengan input_harga
                    }
                },
                {
                    max_harga: {
                        [Sequelize.Op.gte]: input_harga, // max_harga harus lebih besar atau sama dengan input_harga
                    }
                }
            ]
        }
    });
};

const getKeamanan = () => {
    return KeamananModel.findAll();
};

const getKeamananById = (id_keamanan) => {
    return KeamananModel.findByPk(id_keamanan);  // Menggunakan findByPk untuk mencari berdasarkan primary key (id)
};

const getJarak = () => {
    return JarakModel.findAll();
};

const getLuasKamar = () => {
    return LuasKamar.findAll();
};

const getFasilitas = () => {
    return FasilitasModel.findAll();
};

module.exports = { getHarga, getKeamanan, getKeamananById, getJarak, getLuasKamar, getFasilitas };
