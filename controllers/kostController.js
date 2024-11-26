// controllers/kostController.js

const { createKostModel, getKosts, getKostById, getKostsWithSearch, getKostsBySearch } = require('../models/kostModel');
const { formatResponse, HTTP_CODES } = require('../utils/responseFormatter');

// Menambahkan Kost Baru
const createKost = async (req, res) => {
    const { nama_kost, alamat, harga, fasilitas, deskripsi, latitude, longitude } = req.body;

    // Pastikan ada file gambar yang di-upload
    if (!req.file) {
        return res.status(400).json({ error: 'Gambar tidak ditemukan!' });
    }

    const gambarPath = req.file.path; // Path file gambar yang di-upload

    try {
        // Upload gambar ke Cloudinary
        const result = await cloudinary.uploader.upload(gambarPath, {
            resource_type: 'auto',
        });

        // URL gambar dari Cloudinary
        const foto = result.secure_url;

        // Simpan data kost ke database
        await createKostModel(nama_kost, alamat, harga, fasilitas, deskripsi, foto, latitude, longitude);

        // Hapus file sementara di server setelah di-upload
        fs.unlinkSync(gambarPath);

        res.status(201).json({ message: 'Kost created successfully' });
    } catch (err) {
        // Hapus file jika terjadi error
        if (fs.existsSync(gambarPath)) {
            fs.unlinkSync(gambarPath);
        }
        res.status(500).json({ error: err.message });
    }
};

// Mengambil Semua Data Kost
// const getKostsHandler = (req, res) => {
//     getKosts()
//         .then(kosts => res.status(200).json(kosts))
//         .catch(err => res.status(500).json({ error: err.message }));
// };
const getKostsHandler = async (req, res) => {
    try {
        const search = req.query.search || ''; // Ambil nilai `search` dari query parameter

        // Panggil fungsi pencarian
        const kosts = await getKostsBySearch(search);

        // Format respons sukses
        res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', kosts));
    } catch (err) {
        // Format respons error
        res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
    }
};
// Mengambil Kost berdasarkan ID
const getKostByIdHandler = (req, res) => {
    const { id } = req.params;
    getKostById(id)
        .then(kost => res.status(200).json(kost))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { createKost, getKostsHandler, getKostByIdHandler };
