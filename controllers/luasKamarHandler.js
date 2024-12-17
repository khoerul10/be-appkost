const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");
const db = require('../models');

// **Get All LuasKamar**
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

  // **Get LuasKamar by ID**
const getLuastKamarByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari LuasKamar berdasarkan ID
    const luasKamar = await db.LuasKamar.findByPk(id);

    if (!luasKamar) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'luasKamar not found', null)
      );
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'luasKamar retrieved successfully', luasKamar)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving luasKamar', { error: error.message })
    );
  }
};

  // **Delete LuasKamar**
const deleteLuasKamarHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah LuasKamar dengan ID yang diberikan ada
    const luasKamar = await db.LuasKamar.findByPk(id);

    if (!luasKamar) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'luasKamar not found', null)
      );
    }

    // Hapus LuasKamar
    await luasKamar.destroy();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'luasKamar deleted successfully', null)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting luasKamar', { error: error.message })
    );
  }
};

// **Add LuasKamar**
const addLuasKamarHandler = async (req, res) => {
  try {
    const { panjang, lebar, bobot } = req.body;

    // Validasi data
    if (!panjang || !lebar || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'LuasKamar and bobot are required', null)
      );
    }
    const luas = panjang * lebar
    // Tambahkan data ke tabel LuasKamar
    const newLuasKamar = await db.LuasKamar.create({
      panjang,
      lebar,
      luas,
      bobot,
    });

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'LuasKamar added successfully', newLuasKamar)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error adding LuasKamar', { error: error.message })
    );
  }
};

// **Update LuasKamar**
const updateLuasKamarHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { panjang, lebar, bobot } = req.body;

    // Periksa apakah LuasKamar dengan ID yang diberikan ada
    const existingLuasKamar = await db.LuasKamar.findByPk(id);

    if (!existingLuasKamar) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'LuasKamar not found', null)
      );
    }

    // Validasi data
    if (!panjang || !lebar || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'LuasKamar and bobot are required', null)
      );
    }

    const luas = panjang * lebar

    // Perbarui data fasilitas
    existingLuasKamar.panjang = panjang;
    existingLuasKamar.lebar = lebar;
    existingLuasKamar.luas = luas;
    existingLuasKamar.bobot = bobot;

    await existingLuasKamar.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'LuasKamar updated successfully', existingLuasKamar)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating LuasKamar', { error: error.message })
    );
  }
};

module.exports = {
    getLuasKamarHandler,
    getLuastKamarByIdHandler,
    addLuasKamarHandler,
    deleteLuasKamarHandler,
    updateLuasKamarHandler,
  };
  