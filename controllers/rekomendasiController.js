const { KostModel } = require("../models");
const RekomendasiModel = require("../models/rekomendasi");
const UserModel = require("../models/user");

// Controller untuk menambahkan rekomendasi
const createRekomendasi = async (req, res) => {
    try {
        // Ambil user_id dari req.user (diasumsikan diisi oleh middleware autentikasi)
        const user_id = req.user.id;
        const { kost_id } = req.body;

        // Validasi input
        if (!kost_id) {
            return res.status(400).json({ message: 'kost_id is required' });
        }

        // Buat entri rekomendasi baru
        const newRekomendasi = await RekomendasiModel.create({
            kost_id,
            user_id,
        });

        return res.status(201).json({
            message: 'Rekomendasi berhasil dibuat',
            data: newRekomendasi,
        });
    } catch (error) {
        console.error('Error creating rekomendasi:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getRekomendasi = async (req, res) => {
    try {
        // Query data rekomendasi berdasarkan user_id
        const rekomendasiList = await RekomendasiModel.findAll({
            include: [
                { model: UserModel, as: 'user', attributes: ['username', 'email'] },
                { model: KostModel, as: 'kost', attributes: ['nama_kost'] },
            ],
        });

        return res.status(200).json({
            message: 'Rekomendasi retrieved successfully',
            data: rekomendasiList,
        });
    } catch (error) {
        console.error('Error retrieving rekomendasi:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller untuk mendapatkan semua rekomendasi berdasarkan user_id
const getRekomendasiByUser = async (req, res) => {
    try {
        // Ambil user_id dari req.user
        const user_id = req.user.id;

        // Query data rekomendasi berdasarkan user_id
        const rekomendasiList = await RekomendasiModel.findAll({
            where: { user_id },
            include: [
                { model: UserModel, as: 'user', attributes: ['username', 'email'] },
                { model: KostModel, as: 'kost', attributes: ['nama_kost'] },
            ],
        });

        return res.status(200).json({
            message: 'Rekomendasi retrieved successfully',
            data: rekomendasiList,
        });
    } catch (error) {
        console.error('Error retrieving rekomendasi:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller untuk menghapus rekomendasi berdasarkan id_rekomendasi dan user_id
const deleteRekomendasi = async (req, res) => {
    try {
        // Ambil user_id dari req.user dan id_rekomendasi dari parameter
        const user_id = req.user.id;
        const { id_rekomendasi } = req.params;

        // Cari dan hapus entri rekomendasi jika cocok dengan id_rekomendasi dan user_id
        const deleted = await RekomendasiModel.destroy({
            where: { id_rekomendasi, user_id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Rekomendasi not found or not authorized to delete' });
        }

        return res.status(200).json({ message: 'Rekomendasi berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting rekomendasi:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createRekomendasi,
    getRekomendasi,
    getRekomendasiByUser,
    deleteRekomendasi,
};