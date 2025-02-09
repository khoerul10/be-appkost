const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const db = require('../../models');
const { formatResponse, HTTP_CODES } = require('../../utils/responseFormatter');

const getAllUsersReport = async (req, res) => {
  try {
    // Ambil semua data pengguna dari database
    const users = await db.User.findAll();
    if (!users || users.length === 0) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'No users found')
      );
    }

    // Buat file PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const tempDir = os.tmpdir();
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filePath = path.join(tempDir, `all_users_report_${uniqueId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Tambahkan judul
    doc.fontSize(18).text('All Users Report', { align: 'center' });
    doc.moveDown();

    // Header tabel
    const tableTop = 100;
    let y = tableTop;

    doc.fontSize(12).text('ID', 50, y);
    doc.text('Username', 100, y);
    doc.text('Email', 250, y);
    doc.text('Role', 400, y);
    doc.text('Status', 500, y);
    doc.moveDown();
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    // Isi tabel dengan validasi
    y += 25;
    users.forEach(user => {
      const userData = user.dataValues; // Ambil dataValues dari masing-masing user
      if (!userData || !userData.user_id) return;

      doc.text(String(userData.user_id), 50, y);
      doc.text(userData.username || '-', 100, y);
      doc.text(userData.email || '-', 250, y);
      doc.text(userData.role || '-', 400, y);
      doc.text(userData.status || '-', 500, y);
      y += 20;
    });

    doc.end();

    // Tunggu file selesai dibuat, lalu kirim sebagai respons
    writeStream.on('finish', () => {
      res.download(filePath, `all_users_report.pdf`, (err) => {
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

module.exports = { getAllUsersReport };
