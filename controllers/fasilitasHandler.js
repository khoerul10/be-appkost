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

  // **Get Fasilitas by ID**
const getFasilitasByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari fasilitas berdasarkan ID
    const fasilitas = await db.Fasilitas.findByPk(id);

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

  // **Delete Fasilitas**
const deleteFasilitasHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah fasilitas dengan ID yang diberikan ada
    const fasilitas = await db.Fasilitas.findByPk(id);

    if (!fasilitas) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Fasilitas not found', null)
      );
    }

    // Hapus fasilitas
    await fasilitas.destroy();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Fasilitas deleted successfully', null)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting fasilitas', { error: error.message })
    );
  }
};

// **Add Fasilitas**
const addFasilitasHandler = async (req, res) => {
  try {
    const { fasilitas, bobot } = req.body;

    // Validasi data
    if (!fasilitas || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Fasilitas and bobot are required', null)
      );
    }

    // Tambahkan data ke tabel Fasilitas
    const newFasilitas = await db.Fasilitas.create({
      fasilitas,
      bobot,
    });

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'Fasilitas added successfully', newFasilitas)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error adding fasilitas', { error: error.message })
    );
  }
};

// **Update Fasilitas**
const updateFasilitasHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { fasilitas, bobot } = req.body;

    // Periksa apakah fasilitas dengan ID yang diberikan ada
    const existingFasilitas = await db.Fasilitas.findByPk(id);

    if (!existingFasilitas) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Fasilitas not found', null)
      );
    }

    // Validasi data
    if (!fasilitas || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Fasilitas and bobot are required', null)
      );
    }

    // Perbarui data fasilitas
    existingFasilitas.fasilitas = fasilitas;
    existingFasilitas.bobot = bobot;

    await existingFasilitas.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Fasilitas updated successfully', existingFasilitas)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating fasilitas', { error: error.message })
    );
  }
};

module.exports = {
    getFasilitasHandler,
    getFasilitasByIdHandler,
    addFasilitasHandler,
    deleteFasilitasHandler,
    updateFasilitasHandler,
  };
  