const cloudinary = require('../config/cloudinaryConfig');

const uploadSingeToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'assets/image' },
        (error, result) => {
          if (error) {
            reject(new Error('Gagal mengunggah gambar ke Cloudinary'));
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer); // Kirim buffer untuk diunggah
    });
  };

  const uploadMultipleToCloudinary = (files) => {
    return Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'assets/image' },
            (error, result) => {
              if (error) {
                reject(new Error('Gagal mengunggah gambar ke Cloudinary'));
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );
  };

  
module.exports = {uploadSingeToCloudinary, uploadMultipleToCloudinary}