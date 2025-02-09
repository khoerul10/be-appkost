const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { id: localeID } = require('date-fns/locale');
const os = require('os');
const crypto = require('crypto');
const db = require('../../models');
const { formatResponse, HTTP_CODES } = require('../../utils/responseFormatter');

const getUserByIdReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(HTTP_CODES.BAD_REQUEST.code).json(
        formatResponse(HTTP_CODES.BAD_REQUEST, 'Invalid user ID')
      );
    }

    // Cari user berdasarkan ID
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'User not found')
      );
    }
    
            const logoPath = path.resolve(__dirname, '../../assets/image/iconKost.png');
        
            function generateHeader(doc) {
              const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: localeID })
              
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
    const filePath = path.join(tempDir, `user_report_${id}_${uniqueId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Tambahkan judul
    generateHeader(doc);
    doc.fontSize(18).text('User Report', 50, 110, { align: 'center' });
    doc.moveDown(1.5);

    // Tambahkan detail user
    doc.fontSize(12);
    doc.text(`Username: ${user.username}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Role: ${user.role}`);
    doc.text(`Phone: ${user.phone}`);
    doc.text(`Address: ${user.address}`);
    doc.text(`Status: ${user.status}`);

    generateFooter(doc);
    doc.end();

    // Tunggu file selesai dibuat, lalu kirim sebagai respons
    writeStream.on('finish', () => {
      res.download(filePath, `user_report_${user.username}.pdf`, (err) => {
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

module.exports = { getUserByIdReport };
