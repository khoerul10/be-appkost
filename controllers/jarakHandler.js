const { formatResponse, HTTP_CODES } = require("../utils/responseFormatter");
const db = require('../models');

// **Get All Jarak**
const getJarakHandler = async (req, res) => {
    try {
      const data = await db.Jarak.findAll();
      return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, '',  data));
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
        formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error fetching Jarak', { error: error.message })
      );
    }
  };

  // **Get Jarak by ID**
const getJarakByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari Jarak berdasarkan ID
    const jarak = await db.Jarak.findByPk(id);

    if (!jarak) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Jarak not found', null)
      );
    }

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Jarak retrieved successfully', jarak)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving Jarak', { error: error.message })
    );
  }
};

  // **Delete Jarak**
const deleteJarakHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah Jarak dengan ID yang diberikan ada
    const jarak = await db.Jarak.findByPk(id);

    if (!jarak) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Jarak not found', null)
      );
    }

    // Hapus jarak
    await jarak.destroy();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Jarak deleted successfully', null)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleting Jarak', { error: error.message })
    );
  }
};

// **Add Jarak**
const addJarakHandler = async (req, res) => {
  try {
    const { jarak, satuan, bobot } = req.body;

    // Validasi data
    if (!jarak || !satuan || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Jarak and bobot are required', null)
      );
    }

    // Tambahkan data ke tabel Fasilitas
    const newJarak = await db.Jarak.create({
      jarak,
      satuan,
      bobot,
    });

    return res.status(HTTP_CODES.CREATED.code).json(
      formatResponse(HTTP_CODES.CREATED, 'Jarak added successfully', newJarak)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error adding Jarak', { error: error.message })
    );
  }
};

// **Update Jarak**
const updateJarakHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { jarak, satuan, bobot } = req.body;

    // Periksa apakah Jarak dengan ID yang diberikan ada
    const existingJarak = await db.Jarak.findByPk(id);

    if (!existingJarak) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Jarak not found', null)
      );
    }

    // Validasi data
    if (!jarak || !satuan || !bobot) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Jarak and bobot are required', null)
      );
    }

    // Perbarui data Jarak
    existingJarak.jarak = jarak;
    existingJarak.satuan = satuan;
    existingJarak.bobot = bobot;

    await existingJarak.save();

    return res.status(HTTP_CODES.SUCCESS.code).json(
      formatResponse(HTTP_CODES.SUCCESS, 'Jarak updated successfully', existingJarak)
    );
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error updating Jarak', { error: error.message })
    );
  }
};

module.exports = {
    getJarakHandler,
    getJarakByIdHandler,
    addJarakHandler,
    deleteJarakHandler,
    updateJarakHandler,
  };
  