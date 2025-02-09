const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const db = require('../../models');
const { formatResponse, HTTP_CODES } = require('../../utils/responseFormatter');

const getAllHargaReport = async (req, res) => {
  try {
    // Ambil semua data harga dari database
    const hargaList = await db.Harga.findAll();
    if (!hargaList || hargaList.length === 0) {
      return res.status(HTTP_CODES.NOT_FOUND.code).json(
        formatResponse(HTTP_CODES.NOT_FOUND, 'No harga data found')
      );
    }

    // Buat file PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const tempDir = os.tmpdir();
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filePath = path.join(tempDir, `all_harga_report_${uniqueId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Tambahkan judul
    doc.fontSize(18).text('All Harga Report', { align: 'center' });
    doc.moveDown();

    // Header tabel
    const tableTop = 100;
    let y = tableTop;

    doc.fontSize(12).text('No', 50, y);
    doc.text('Range Harga', 100, y);
    doc.text('Min Harga', 250, y);
    doc.text('Max Harga', 350, y);
    doc.text('Bobot', 450, y);
    doc.moveDown();
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    // Isi tabel dengan nomor berurut
    y += 25;
    hargaList.forEach((item, index) => {
      if (!item) return;

      doc.text(String(index + 1), 50, y);
      doc.text(`Rp ${item.range_harga ? item.range_harga.toLocaleString() : '-'}`, 100, y);
      doc.text(`Rp ${item.min_harga ? item.min_harga.toLocaleString() : '-'}`, 250, y);
      doc.text(`Rp ${item.max_harga ? item.max_harga.toLocaleString() : '-'}`, 350, y);
      doc.text(item.bobot || '-', 450, y);
      y += 20;
    });

    doc.end();

    // Tunggu file selesai dibuat, lalu kirim sebagai respons
    writeStream.on('finish', () => {
      res.download(filePath, `all_harga_report.pdf`, (err) => {
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

module.exports = { getAllHargaReport };
