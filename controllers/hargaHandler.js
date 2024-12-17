const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");
const db = require('../models');

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

// **Get Harga by ID**
const getHargaByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari fasilitas berdasarkan ID
    const fasilitas = await db.Harga.findByPk(id);

    if (!fasilitas) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Fasilitas not found', null)
      );
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Fasilitas retrieved successfully', fasilitas)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving fasilitas', { error: error.message })
    );
  }
};

// **Delete Harga**
const deleteHargaHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah harga dengan ID yang diberikan ada
    const harga = await db.Harga.findByPk(id);

    if (!harga) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'harga not found', null)
      );
    }

    // Hapus harga
    await harga.destroy();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'harga deleted successfully', null)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting harga', { error: error.message })
    );
  }
};

// **Add Harga**
const addHargaHandler = async (req, res) => {
  try {
    const { range_harga, min_harga, max_harga, bobot } = req.body;

    // Validasi data
    if (!min_harga || !max_harga || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Fasilitas and bobot are required', null)
      );
    }

    // Tambahkan data ke tabel harga
    const newHarga = await db.Harga.create({
      range_harga,
      min_harga,
      max_harga,
      bobot,
    });

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'Fasilitas added successfully', newHarga)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error adding fasilitas', { error: error.message })
    );
  }
};

// **Update Harga**
const updateHargaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { range_harga, min_harga, max_harga, bobot } = req.body;

    // Periksa apakah harga dengan ID yang diberikan ada
    const existingHarga= await db.Harga.findByPk(id);

    if (!existingHarga) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Harga not found', null)
      );
    }

    // Validasi data
    if (!min_harga || !max_harga || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Harga and bobot are required', null)
      );
    }

    // Perbarui data fasilitas
    existingHarga.min_harga = min_harga;
    existingHarga.max_harga = max_harga;
    existingHarga.range_harga = range_harga;
    existingHarga.bobot = bobot;

    await existingHarga.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Harga updated successfully', existingHarga)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating Harga', { error: error.message })
    );
  }
};

module.exports = {
    getHargaHandler,
    getHargaByIdHandler,
    addHargaHandler,
    deleteHargaHandler,
    updateHargaHandler,
  };
  