const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// async function testCloudinaryConnection() {
//   try {
//     const result = await cloudinary.api.ping();
//     console.log('Koneksi ke Cloudinary berhasil:', result);
//   } catch (error) {
//     console.error('Gagal terhubung ke Cloudinary:', error);
//   }
// }

// testCloudinaryConnection();

module.exports = cloudinary;
