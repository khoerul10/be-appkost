const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");
const db = require('../models');

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

  // **Get Keamanan by ID**
const getKeamananByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari Keamanan berdasarkan ID
    const keamanan = await db.Keamanan.findByPk(id);

    if (!keamanan) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'keamanan not found', null)
      );
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'keamanan retrieved successfully', keamanan)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving keamanan', { error: error.message })
    );
  }
};

  // **Delete Keamanan**
const deleteKeamananHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah keamanan dengan ID yang diberikan ada
    const keamanan = await db.Keamanan.findByPk(id);

    if (!keamanan) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'keamanan not found', null)
      );
    }

    // Hapus keamanan
    await keamanan.destroy();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'keamanan deleted successfully', null)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting keamanan', { error: error.message })
    );
  }
};

// **Add Keamanan**
const addKeamananHandler = async (req, res) => {
  try {
    const { keamanan, bobot } = req.body;

    // Validasi data
    if (!keamanan || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Keamanan and bobot are required', null)
      );
    }

    // Tambahkan data ke tabel Keamanan
    const newKeamanan = await db.Keamanan.create({
      keamanan,
      bobot,
    });

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'Keamanan added successfully', newKeamanan)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error adding Keamanan', { error: error.message })
    );
  }
};

// **Update Keamanan**
const updateKeamananHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { keamanan, bobot } = req.body;

    // Periksa apakah Keamanan dengan ID yang diberikan ada
    const existingKeamanan = await db.Keamanan.findByPk(id);

    if (!existingKeamanan) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Keamanan not found', null)
      );
    }

    // Validasi data
    if (!keamanan || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Keamanan and bobot are required', null)
      );
    }

    // Perbarui data fasilitas
    existingKeamanan.keamanan = keamanan;
    existingKeamanan.bobot = bobot;

    await existingKeamanan.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Keamanan updated successfully', existingKeamanan)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating Keamanan', { error: error.message })
    );
  }
};

module.exports = {
    getKeamananHandler,
    getKeamananByIdHandler,
    addKeamananHandler,
    deleteKeamananHandler,
    updateKeamananHandler,
  };
  