// const { getFasilitas, getHarga, getJarak, getKeamanan, getLuasKamar, getKeamananById } = require("../models/kriteriaModel");
const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");
const db = require('../models');

// **Get All Fasilitas**
const getFasilitasHandler = async (req, res) => {
    try {
      const data = await db.Fasilitas.findAll();
      return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
      );
    }
  };

// **Get All Harga**
const getHargaHandler = async (req, res) => {
    try {
      const data = await db.Harga.findAll();
      return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
      );
    }
  };

// **Get All Jarak**
const getJarakHandler = async (req, res) => {
    try {
      const data = await db.Jarak.findAll();
      return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
      );
    }
  };

// **Get All Keamanan**
const getKeamananHandler = async (req, res) => {
    try {
      const data = await db.Keamanan.findAll();
      return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
      );
    }
  };


// const getKeamananByIdHandler = async (req, res) => {
//     try {
//         const data = await db.Keamanan.findByPk(req.params.id_keamanan);
//         if (data) {
//             res.status(HTTP_CODES.SUCCESS.code).json(
//                 formatResponse(HTTP_CODES.SUCCESS, '', data)
//             );
//         } else {
//             res.status(HTTP_CODES.NOT_FOUND.code).json(
//                 formatResponse(HTTP_CODES.NOT_FOUND, 'Keamanan tidak ditemukan')
//             );
//         }
//     } catch (error) {
//         res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
//             formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error.message)
//         );
//     }
// };


// **Get All Luas kamar**
const getLuasKamarHandler = async (req, res) => {
    try {
        const data = await db.LuasKamar.findAll();
            return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching users', { error: error.message })
        );
    }
};

 


// const getFasilitasHandler = (req, res) => {
//     getFasilitas()
//         .then(fasilitas => {
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', fasilitas));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

// const getHargaHandler = (req, res) => {
//     const { harga } = req.query; 

//     if (!harga) {
//         return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Harga parameter is required'));
//     }

//     const inputHarga = parseInt(harga, 10);

//     if (isNaN(inputHarga)) {
//         return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Harga must be a valid number'));
//     }

//     getHarga(inputHarga)
//         .then(hargaData => {
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', hargaData));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

// const getJarakHandler = (req, res) => {
//     getJarak()
//         .then(jarak => {
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', jarak));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

// const getKeamananHandler = (req, res) => {
//     getKeamanan()
//         .then(keamanan => {
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', keamanan));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

// const getKeamananByIdHandler = (req, res) => {
//     const { id } = req.params;  // Mengambil id dari URL parameter

//     if (!id) {
//         return res.status(400).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'ID parameter is required'));
//     }

//     getKeamananById(id)
//         .then(keamanan => {
//             if (!keamanan) {
//                 return res.status(404).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Keamanan data not found'));
//             }
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', keamanan));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

// const getLuasKamarHandler = (req, res) => {
//     getLuasKamar()
//         .then(luasKamar => {
//             res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', luasKamar));
//         })
//         .catch(err => {
//             res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//         });
// };

module.exports = { getFasilitasHandler, getHargaHandler, getJarakHandler, getKeamananHandler, getLuasKamarHandler };
