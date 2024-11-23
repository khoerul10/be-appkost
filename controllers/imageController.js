const cloudinary = require('../config/cloudinaryConfig');  // Mengimpor konfigurasi Cloudinary
const fs = require('fs');

// Fungsi untuk meng-upload gambar ke Cloudinary
exports.uploadImage = (req, res) => {
    const gambarPath = req.file.path;  // Mengambil path file gambar dari request

    cloudinary.uploader.upload(gambarPath, { 
        resource_type: 'auto'  // Menyesuaikan tipe file (gambar atau video)
    })
    .then(result => {
        // Setelah berhasil upload, simpan URL gambar ke database
        console.log('Gambar berhasil di-upload:', result.secure_url);
        res.status(200).json({ url: result.secure_url });
        
        // Opsional: Hapus gambar sementara di server setelah di-upload ke Cloudinary
        fs.unlinkSync(gambarPath);  // Menghapus file setelah di-upload
    })
    .catch(error => {
        console.error('Gagal upload gambar:', error);
        res.status(500).json({ error: 'Gagal upload gambar' });
    });
};
