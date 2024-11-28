const { Op } = require('sequelize');
const { FasilitasModel, KeamananModel } = require('../models');
const KostModel = require('../models/kost');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const { getHarga } = require('../models/kriteriaModel');
const HargaModel = require('../models/harga');

// Create
const createKost = async (req, res) => {
  try {
    const { nama_kost, harga } = req.body;

    // Validasi input harga
    const inputHarga = parseInt(harga, 10);
    if (isNaN(inputHarga)) {
      return res.status(400).json({
        code: 400,
        message: "Harga harus berupa angka.",
      });
    }

    // Validasi file upload
    if (!req.files || req.files.length === 0 || req.files.length > 3) {
      return res.status(400).json({
        code: 400,
        message: "Upload maksimal 3 file!",
      });
    }

    // Validasi nama kost
    const existingKost = await KostModel.findOne({ where: { nama_kost } });
    if (existingKost) {
      return res.status(400).json({
        code: 400,
        message: "Nama kost sudah digunakan. Silakan pilih nama lain.",
      });
    }

    // Cari data harga berdasarkan input harga
    const hargaRange = await HargaModel.findOne({
      where: {
        min_harga: { [Op.lte]: inputHarga }, // min_harga <= inputHarga
        max_harga: { [Op.gte]: inputHarga }, // max_harga >= inputHarga
      },
      attributes: ["harga_id", "min_harga", "max_harga"], // Ambil hanya harga_id
    });

    console.log('hargaRange', hargaRange);

    if (!hargaRange) {
      return res.status(400).json({
        code: 400,
        message: "Harga tidak sesuai dengan rentang harga yang tersedia.",
      });
    }

    // Ambil harga_id dari hasil query
    const resultHarga = hargaRange.harga_id;

    // Proses file upload
    const photoUrls = req.files.map((file) => file.path); // URL file
    const thumbImage = photoUrls[0]; // Thumbnail dari file pertama

    // Simpan data ke database
    const kost = await KostModel.create({
      ...req.body,
      photos: JSON.stringify(photoUrls),
      thumb_image: thumbImage,
      harga_id: resultHarga, // Masukkan harga_id yang sesuai
    });

    return res.status(201).json({
      message: "Kost berhasil ditambahkan",
      data: kost,
    });
  } catch (error) {
    console.error("Error saat membuat kost:", error); // Logging error untuk debugging
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Read All
const getAllKosts = async (req, res) => {
  try {
    const { search } = req.query;
    const kosts = await KostModel.findAll({
      where: {
        [Op.or]: ['nama_kost', 'alamat'].map(field => ({
          [field]: {
            [Op.like]: `%${search}%`,
          }
        }))
      },
      order: [['created_at', 'DESC']], 
    });
    if (!kosts || kosts.length === 0) {
      res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Kost tidak ditemukan')
      );
    } else {
      res.status(HTTP_CODES.SUCCESS.code).json(
        formatResponse(HTTP_CODES.SUCCESS, '', kosts)
      );
    }
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};

// Read One
const getKostById = async (req, res) => {
  try {
    const kost = await KostModel.findByPk(req.params.kost_id, {
      include: [
        {
          model: FasilitasModel,
          as: 'fasilitasDetail', // Alias yang ditentukan saat membuat relasi
          attributes: ['id_fasilitas', 'fasilitas'], // Kolom yang diambil dari Fasilitas
        },{
          model: KeamananModel,
          as: 'keamananDetail', // Alias yang ditentukan saat membuat relasi
          attributes: ['keamanan'], // Kolom yang diambil dari Fasilitas
        },{
          model: HargaModel,
          as: 'hargaDetail', // Alias yang ditentukan saat membuat relasi
          attributes: ['min_harga', 'max_harga'], // Kolom yang diambil dari Fasilitas
        }
      ],
      attributes: ['kost_id', 'nama_kost', 'alamat', 'jenis_kost', 'harga']
    });
    if (kost) {
      res.status(HTTP_CODES.SUCCESS.code).json(
        formatResponse(HTTP_CODES.SUCCESS, '', kost)
      );
    } else {
      res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Kost tidak ditemukan')
      );
    }
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};

// Update
const updateKost = async (req, res) => {
  try {
    const updated = await KostModel.update(req.body, { where: { kost_id: req.params.kost_id } });
    if (updated[0] > 0) {
      res.status(HTTP_CODES.SUCCESS.code).json(
        formatResponse(HTTP_CODES.SUCCESS, 'Kost berhasil diperbarui')
      );
    } else {
      res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Kost tidak ditemukan')
      );
    }
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};

// Delete
const deleteKost = async (req, res) => {
  try {
    const deleted = await KostModel.destroy({ where: { kost_id: req.params.kost_id } });
    if (deleted) {
      res.status(HTTP_CODES.SUCCESS.code).json(
        formatResponse(HTTP_CODES.SUCCESS, 'Kost berhasil dihapus')
      );
    } else {
      res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Kost tidak ditemukan')
      );
    }
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};

// Export all functions
module.exports = {
  createKost,
  getAllKosts,
  getKostById,
  updateKost,
  deleteKost,
};
