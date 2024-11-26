const { formatResponse, HTTP_CODES } = require('../utils/responseFormatter');
const { saveImage, getImages, saveImageWithMultiURL } = require('../models/imageModel');
const multer = require('multer');
const { uploadSingeToCloudinary, uploadMultipleToCloudinary } = require('../middleware/uploadSingle');


const upload = multer({ storage: multer.memoryStorage() });

const getImageHandler = async (req, res) => {
  try {

      // Panggil fungsi pencarian
      const kosts = await getImages();

      // Format respons sukses
      res.status(200).json(formatResponse(HTTP_CODES.SUCCESS, '', kosts));
  } catch (err) {
      // Format respons error
      res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
  }
};

const postImageHandler = [
  upload.single('image'), // Gunakan single untuk unggahan satu file
  async (req, res) => {
    try {
      const { id, name } = req.body;

      // Validasi input
      if (!id || !name || !req.file) {
        return res
          .status(400)
          .json(formatResponse(HTTP_CODES.BAD_REQUEST, 'ID, Name, dan file gambar harus diisi'));
      }

      // Unggah ke Cloudinary
      const uploadResult = await uploadSingeToCloudinary(req.file.buffer);

      // Simpan ke database
      const result = await saveImage(id, name, uploadResult.secure_url);

      // Format respons sukses
      res.status(201).json(formatResponse(HTTP_CODES.CREATED, 'Gambar berhasil disimpan', result));
    } catch (err) {
      res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
    }
  }
];

// const postMultiImageHandler = [
//   upload.array('images', 10), // Maksimal 10 file
//   async (req, res) => {
//     try {
//       const { id, name } = req.body;

//       // Validasi input
//       if (!id || !name || !req.files || req.files.length === 0) {
//         return res
//           .status(400)
//           .json(formatResponse(HTTP_CODES.BAD_REQUEST, 'ID, Name, dan file gambar harus diisi'));
//       }

//       // Unggah semua gambar ke Cloudinary
//       const uploadResults = await uploadMultipleToCloudinary(req.files);

//       // Dapatkan semua URL yang diunggah
//       const multiurl = uploadResults.map((result) => result.secure_url);

//       // Simpan ke database
//       const result = await saveImageWithMultiURL(id, name, multiurl);

//       // Format respons sukses
//       res
//         .status(201)
//         .json(formatResponse(HTTP_CODES.CREATED, 'Gambar berhasil disimpan', result));
//     } catch (err) {
//       res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
//     }
//   },
// ];


const postMultiImageHandler = [
  upload.array('images', 10), // Membatasi hingga 10 file
  async (req, res) => {
    try {
      const { id, name } = req.body;

      // Validasi input
      if (!id || !name || !req.files || req.files.length === 0) {
        return res
          .status(400)
          .json(formatResponse(HTTP_CODES.BAD_REQUEST, 'ID, Name, dan file gambar harus diisi'));
      }

      // Ambil file pertama dari array
      const thumbFile = req.files[0];

      // Unggah file thumb ke Cloudinary
      const thumbUploadResult = await uploadSingeToCloudinary(thumbFile.buffer);

      // Simpan ke database (thumb_image dan multiurl)
      const multiUrls = [];
      for (const file of req.files) {
        const uploadResult = await uploadSingeToCloudinary(file.buffer);
        multiUrls.push(uploadResult.secure_url);
      }

      // Simpan thumb_image dan multiurl ke database
      const result = await saveImageWithMultiURL(id, name, thumbUploadResult.secure_url, multiUrls);

      // Format respons sukses
      res.status(201).json(formatResponse(HTTP_CODES.CREATED, 'Gambar berhasil disimpan', result));
    } catch (err) {
      res.status(500).json(formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, err.message));
    }
  },
];



module.exports = { getImageHandler, postImageHandler, postMultiImageHandler };
