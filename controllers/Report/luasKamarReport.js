const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { id } = require('date-fns/locale');
const os = require('os');
const crypto = require('crypto');
const db = require('../../models');
const { formatResponse, HTTP_CODES } = require('../../utils/responseFormatter');

const getAllLuasKamarReport = async (req, res) => {
  try {
    // Ambil semua data luas kamar dari database
    const luasKamarList = await db.LuasKamar.findAll();
    if (!luasKamarList || luasKamarList.length === 0) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'No luas kamar data found')
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
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const tempDir = os.tmpdir();
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filePath = path.join(tempDir, `all_luas_kamar_report_${uniqueId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Tambahkan judul
    generateHeader(doc);
    doc.fontSize(18).text('All Luas Kamar Report', 50, 110, { align: 'center' });
    doc.moveDown(1.5);

    // Header tabel
    const tableTop = 150;
    let y = tableTop;

    doc.fontSize(12).text('No', 50, y);
    doc.text('Panjang (m)', 100, y);
    doc.text('Lebar (m)', 200, y);
    doc.text('Luas (m²)', 300, y);
    doc.text('Bobot', 400, y);
    doc.moveDown();
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    // Isi tabel dengan nomor berurut
    y += 25;
    luasKamarList.forEach((item, index) => {
      if (!item) return;

      doc.text(String(index + 1), 50, y);
      doc.text(`${item.panjang} m` || '-', 100, y);
      doc.text(`${item.lebar} m` || '-', 200, y);
      doc.text(`${item.luas} m²` || '-', 300, y);
      doc.text(String(item.bobot) || '-', 400, y);
      y += 20;
    });

    generateFooter(doc);
    doc.end();

    // Tunggu file selesai dibuat, lalu kirim sebagai respons
    writeStream.on('finish', () => {
      res.download(filePath, `all_luas_kamar_report.pdf`, (err) => {
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

module.exports = { getAllLuasKamarReport };