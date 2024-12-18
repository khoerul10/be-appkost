const { Op } = require('sequelize');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const db = require('../models');

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
    // if (!req.files || req.files.length === 0 || req.files.length > 3) {
    //   return res.status(400).json({
    //     code: 400,
    //     message: "Upload maksimal 3 file!",
    //   });
    // }

    // Validasi nama kost
    const existingKost = await db.Kost.findOne({ where: { nama_kost } });
    if (existingKost) {
      return res.status(400).json({
        code: 400,
        message: "Nama kost sudah digunakan. Silakan pilih nama lain.",
      });
    }

    // Cari data harga berdasarkan input harga
    const hargaRange = await db.Harga.findOne({
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
    const thumbImage = photoUrls.length > 0 ? photoUrls[0] : null; 

    // Simpan data ke database
    const kost = await db.Kost.create({
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
    const { search, limit } = req.query;

    // Default query options
    const queryOptions = {
      where: {
        [Op.or]: ['nama_kost', 'alamat'].map(field => ({
          [field]: {
            [Op.like]: `%${search}%`,
          }
        }))
      },
      order: [['created_at', 'DESC']],
    };

    // Apply limit only if it is provided
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        queryOptions.limit = parsedLimit;
      }
    }

    const kosts = await db.Kost.findAll(queryOptions);

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

const getAllKostsByHarga = async (req, res) => {
  try {
    const kosts = await db.Kost.findAll({
      order: [['harga', 'ASC']], 
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
    const kost = await db.Kost.findByPk(req.params.kost_id, {
      include: [
        {
            model: db.Harga,
            as: 'hargaDetail',
            attributes: ['bobot'],
        },
        {
            model: db.Fasilitas,
            as: 'fasilitasDetail',
            attributes: ['fasilitas'],
        },
        {
            model: db.Jarak,
            as: 'jarakDetail',
            attributes: ['jarak', 'satuan'],
        },
        {
            model: db.LuasKamar,
            as: 'luaskamarDetail',
            attributes: ['panjang','lebar','luas'],
        },
        {
            model: db.Keamanan,
            as: 'keamananDetail',
            attributes: ['keamanan'],
        },
    ],
      // attributes: ['kost_id', 'nama_kost', 'alamat', 'jenis_kost', 'harga']
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
    const { kost_id } = req.params; // Ambil ID kost dari parameter URL
    const { nama_kost, harga } = req.body;

    // Validasi input harga
    const inputHarga = parseInt(harga, 10);
    if (isNaN(inputHarga)) {
      return res.status(400).json({
        code: 400,
        message: "Harga harus berupa angka.",
      });
    }

    // Validasi keberadaan kost berdasarkan ID
    const existingKost = await db.Kost.findByPk(kost_id);
    if (!existingKost) {
      return res.status(404).json({
        code: 404,
        message: "Kost tidak ditemukan.",
      });
    }

    // Validasi nama kost jika berubah
    if (nama_kost && nama_kost !== existingKost.nama_kost) {
      const kostWithSameName = await db.Kost.findOne({ where: { nama_kost } });
      if (kostWithSameName) {
        return res.status(400).json({
          code: 400,
          message: "Nama kost sudah digunakan. Silakan pilih nama lain.",
        });
      }
    }

    // Cari data harga berdasarkan input harga
    const hargaRange = await db.Harga.findOne({
      where: {
        min_harga: { [Op.lte]: inputHarga }, // min_harga <= inputHarga
        max_harga: { [Op.gte]: inputHarga }, // max_harga >= inputHarga
      },
      attributes: ["harga_id", "min_harga", "max_harga"],
    });

    if (!hargaRange) {
      return res.status(400).json({
        code: 400,
        message: "Harga tidak sesuai dengan rentang harga yang tersedia.",
      });
    }

    // Ambil harga_id dari hasil query
    const resultHarga = hargaRange.harga_id;

    // Proses file upload jika ada file yang diunggah
    const photoUrls = req.files.map((file) => file.path); // URL file
    const thumbImage = photoUrls.length > 0 ? photoUrls[0] : null; // Thumbnail dari file pertama

    // Update data kost di database
    await existingKost.update({
      ...req.body,
      photos: JSON.stringify(photoUrls),
      thumb_image: thumbImage,
      harga_id: resultHarga,
    });

    return res.status(200).json({
      message: "Kost berhasil diperbarui",
      data: existingKost,
    });
  } catch (error) {
    console.error("Error saat mengupdate kost:", error); // Logging error untuk debugging
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Delete
const deleteKost = async (req, res) => {
  try {
    const deleted = await db.Kost.destroy({ where: { kost_id: req.params.kost_id } });
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
  getAllKostsByHarga
};
