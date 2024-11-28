const { getFasilitas, getHarga, getJarak, getKeamanan, getLuasKamar, getKeamananById } = require("../models/kriteriaModel");
const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");

const getFasilitasHandler = (req, res) => {
    getFasilitas()
        .then(fasilitas => {
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', fasilitas));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

const getHargaHandler = (req, res) => {
    const { harga } = req.query; 

    if (!harga) {
        return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Harga parameter is required'));
    }

    const inputHarga = parseInt(harga, 10);

    if (isNaN(inputHarga)) {
        return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Harga must be a valid number'));
    }

    getHarga(inputHarga)
        .then(hargaData => {
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', hargaData));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

const getJarakHandler = (req, res) => {
    getJarak()
        .then(jarak => {
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', jarak));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

const getKeamananHandler = (req, res) => {
    getKeamanan()
        .then(keamanan => {
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', keamanan));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

const getKeamananByIdHandler = (req, res) => {
    const { id } = req.params;  // Mengambil id dari URL parameter

    if (!id) {
        return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'ID parameter is required'));
    }

    getKeamananById(id)
        .then(keamanan => {
            if (!keamanan) {
                return res.status(404).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Keamanan data not found'));
            }
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', keamanan));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

const getLuasKamarHandler = (req, res) => {
    getLuasKamar()
        .then(luasKamar => {
            res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', luasKamar));
        })
        .catch(err => {
            res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
        });
};

module.exports = { getFasilitasHandler, getHargaHandler, getJarakHandler, getKeamananHandler, getKeamananByIdHandler, getLuasKamarHandler };
