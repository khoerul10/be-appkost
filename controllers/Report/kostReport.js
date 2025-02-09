const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const os = require('os');
const crypto = require('crypto');
const db = require('../../models');
const { formatResponse, HTTP_CODES } = require('../../utils/responseFormatter');

const getKostReportById = async (req, res) => {
  try {
    const { kost_id } = req.params;

    // Cari kost berdasarkan ID
    const kost = await db.Kost.findByPk(kost_id,{
      include: [
        { model: db.Harga, as: 'hargaDetail', attributes: ['bobot'] },
        { model: db.Fasilitas, as: 'fasilitasDetail', attributes: ['fasilitas'] },
        { model: db.Jarak, as: 'jarakDetail', attributes: ['jarak', 'satuan'] },
        { model: db.LuasKamar, as: 'luaskamarDetail', attributes: ['panjang', 'lebar', 'luas'] },
        { model: db.Keamanan, as: 'keamananDetail', attributes: ['keamanan'] },
      ],
    });

    if (!kost) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'Kost not found')
      );
    }

    const logoPath = path.resolve(__dirname, '../../assets/image/iconKost.png');

    function generateHeader(doc) {
      const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id });

      doc.image(logoPath, 50, 45, { width: 50 })
        .fillColor('#444444')
        .fontSize(20)
        .text('Get-KOST App.', 110, 57)
        .fontSize(10)
        .text('Jakarta', 200, 65, { align: 'right' })
        .text(currentDate, 200, 80, { align: 'right' })
        .moveDown();
    }

    function generateFooter(doc) {
      doc.fontSize(10)
        .text('Terima kasih telah menggunakan layanan kami.', 50, 780, { align: 'right', width: 500 });
    }
    // Buat file PDF
    const doc = new PDFDocument();
    const tempDir = os.tmpdir();
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filePath = path.join(tempDir, `kost_report_${kost_id}_${uniqueId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Judul laporan
    generateHeader(doc);
    doc.fillColor("#444444").fontSize(16).text("Report Kost", 50, 160);
    doc.moveDown(1.5);

    const customerInformationTop = 200;
    doc.fontSize(10)
      .font("Helvetica-Bold").text("Nama kost", 50, customerInformationTop)
      .font("Helvetica").text(`: ${kost.nama_kost}`, 150, customerInformationTop)
      .font("Helvetica-Bold").text("Pemilik", 50, customerInformationTop + 15)
      .font("Helvetica").text(`: ${kost.pemilik}`, 150, customerInformationTop + 15)
      .font("Helvetica-Bold").text("No. Telp", 50, customerInformationTop + 30)
      .font("Helvetica").text(`: ${kost.no_telp}`, 150, customerInformationTop + 30)
      .font("Helvetica-Bold").text("Harga", 50, customerInformationTop + 45)
      .font("Helvetica").text(`: ${kost.harga}`, 150, customerInformationTop + 45)
      .font("Helvetica-Bold").text("Alamat", 50, customerInformationTop + 60)
      .font("Helvetica").text(`:`, 150, customerInformationTop + 60)
      .text(`${kost.alamat}`, 155, customerInformationTop + 60)
      .font("Helvetica-Bold").text("Gambar", 50, customerInformationTop + 90)
      .text(`:`, 150, customerInformationTop + 90);

    // Tambahkan gambar jika ada
  if (Array.isArray(kost.photos) && kost.photos.length > 0) {
      let currentX = 50;
      let currentY = doc.y;
      const imageWidth = 160;
      const maxImagesPerRow = 3;
      let imageCountInRow = 0;

      for (let i = 0; i < kost.photos.length; i++) {
        const imageUrl = kost.photos[i];
        const imagePath = path.join(tempDir, `thumb_image_${kost.kost_id}_${i}.jpg`);
        try {
          const response = await axios({ url: imageUrl, method: 'GET', responseType: 'stream' });
          const imageStream = response.data.pipe(fs.createWriteStream(imagePath));
          await new Promise((resolve, reject) => {
            imageStream.on('finish', resolve);
            imageStream.on('error', reject);
          });

          doc.image(imagePath, currentX, currentY, { width: imageWidth });
          fs.unlinkSync(imagePath);
          imageCountInRow++;

          if (imageCountInRow < maxImagesPerRow) {
            currentX += imageWidth + 10;
          } else {
            currentX = 50;
            currentY += imageWidth + 20;
            imageCountInRow = 0;
          }
        } catch (err) {
          console.error(`Error fetching or adding image (index ${i}):`, err.message);
          doc.text(`Gambar ${i + 1} tidak tersedia.`, { align: 'left' }).moveDown(1);
        }
      }
    } else {
      doc.text('Gambar tidak tersedia.', { align: 'left' }).moveDown(2);
    }

    generateFooter(doc);
    doc.end();

    // Tunggu file selesai dibuat, lalu kirim sebagai respons
    writeStream.on('finish', () => {
      res.download(filePath, `kost_report_${kost.nama_kost}.pdf`, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
            formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error sending file')
          );
        }

        // Hapus file sementara setelah dikirim
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting temporary file:', unlinkErr);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error generating report:', error.stack);
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR.code).json(
      formatResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Error generating report', {
        error: error.message,
      })
    );
  }
};

module.exports = { getKostReportById };
