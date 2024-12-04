const { Sequelize } = require("sequelize");
const { HTTP_CODES, formatResponse } = require("../utils/responseFormatter");
const db = require('../models');

// Controller untuk menambahkan rekomendasi
const createRekomendasi = async (req, res) => {
    try {
        // Ambil user_id dari req.user (diasumsikan diisi oleh middleware autentikasi)
        console.log('req.user', req.user)
        const user_id = req.user.id;
        const { kost_id } = req.body;

        const kost = await db.Kost.findByPk(kost_id);

        if (!kost) {
            return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Kost not found'));
        }

        const cekRekomendasi = await db.Rekomendasi.findAll({
            where: { user_id, kost_id },
        });

        if (cekRekomendasi.length !== 0) {
            return res.status(HTTP_CODES.BAD_REQUEST.code).json(formatResponse(HTTP_CODES.BAD_REQUEST, 'Rekomendasi sudah ada'));
        } 

        // Buat entri rekomendasi baru
        const newRekomendasi = await db.Rekomendasi.create({
            kost_id,
            user_id,
        });

        return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi berhasil dibuat', newRekomendasi ));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error Add Rekomendasi', { error: error.message })
        );
    }
};

const getRekomendasiIsAdmin = async (req, res) => {
    try {
        // Query data rekomendasi berdasarkan user_id
        const rekomendasiUser = await db.Rekomendasi.findAll({
            include: [
                { model: db.User, as: 'user', attributes: ['username', 'email'] },
                { model: db.Kost, as: 'kost', attributes: ['nama_kost'] },
            ],
        });

        return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi retrieved successfully', rekomendasiUser ));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving rekomendasi', { error: error.message })
        );
    }
};

// Controller untuk mendapatkan semua rekomendasi berdasarkan user_id
const getRekomendasiByUser = async (req, res) => {
    try {
        // Ambil user_id dari req.user
        const user_id = req.user.id;

        // Query data rekomendasi berdasarkan user_id
        const rekomendasiUser = await db.Rekomendasi.findAll({
            where: { user_id },
            include: [
                { model: db.User, as: 'user', attributes: ['username', 'email'] },
                { model: db.Kost, as: 'kost', attributes: ['nama_kost', 'harga', 'alamat', 'thumb_image'] },
            ],
        });

        return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi retrieved successfully', rekomendasiUser ));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving rekomendasi', { error: error.message })
        );
    }
};

const getRekomendasiByKost = async (req, res) => {
    try {
        // Ambil user_id dari req.user
        const user_id = req.user.id;
        const { kost_id } = req.params;

        if (!kost_id) {
            return res.status(HTTP_CODES.BAD_REQUEST.code).json(
                formatResponse(HTTP_CODES.BAD_REQUEST, 'kost_id  gaada')
            );
        }

        // Query data rekomendasi berdasarkan user_id
        const rekomendasiOne = await db.Rekomendasi.findAll({
            where: { user_id, kost_id },
            include: [
                { model: db.User, as: 'user', attributes: ['username', 'email'] },
                { model: db.Kost, as: 'kost', attributes: ['nama_kost'] },
            ],
        });

        if (!rekomendasiOne) {
            return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Rekomendasi not found'));
        }

        if (rekomendasiOne.length === 0) {
            return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Rekomendasi not found'));
        }

        return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi retrieved successfully', rekomendasiOne ));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving rekomendasi', { error: error.message })
        );
    }
};

const getRekomendasiByFavorit = async (req, res) => {
    try {
        // Query data rekomendasi, group by kost_id, and count occurrences
        const rekomendasiRaw = await db.Rekomendasi.findAll({
            attributes: [
                'kost_id',
                [Sequelize.fn('COUNT', Sequelize.col('kost_id')), 'total_id'],
            ],
            group: ['kost_id'],
            order: [[Sequelize.literal('total_id'), 'DESC']],
        });

        // Map the results into the desired format
        const rekomendasiList = rekomendasiRaw.map((item) => ({
            id: item.kost_id,
            total_id: item.dataValues.total_id,
        }));

        const topKostIds = rekomendasiList.slice(0, 5).map((item) => item.id);

        // Query kosts data based on top 5 kost_id
        const kosts = await db.Kost.findAll({
            where: {
                kost_id: topKostIds,
            },
        });

        return res.status(HTTP_CODES.SUCCESS.code).json(
            formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi retrieved successfully', kosts)
        );
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving rekomendasi', { error: error.message })
        );
    }
};

// Controller untuk menghapus rekomendasi berdasarkan id_rekomendasi dan user_id
const deleteRekomendasi = async (req, res) => {
    try {
        // Ambil user_id dari req.user dan id_rekomendasi dari parameter
        const user_id = req.user.id;
        const { id_rekomendasi } = req.params;

        // Cari dan hapus entri rekomendasi jika cocok dengan id_rekomendasi dan user_id
        const deleted = await db.Rekomendasi.destroy({
            where: { id_rekomendasi, user_id },
        });

        if (!deleted) {
            return res.status(HTTP_CODES.NOT_FOUND.code).json(formatResponse(HTTP_CODES.NOT_FOUND, 'Rekomendasi not found or not authorized to delete'))
        }

        return res.status(HTTP_CODES.SUCCESS.code).json(formatResponse(HTTP_CODES.SUCCESS, 'Rekomendasi berhasil dihapus' ));
    } catch (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error deleted rekomendasi', { error: error.message })
        );
    }
};

module.exports = {
    createRekomendasi,
    getRekomendasiIsAdmin,
    getRekomendasiByUser,
    getRekomendasiByKost,
    deleteRekomendasi,
    getRekomendasiByFavorit
};