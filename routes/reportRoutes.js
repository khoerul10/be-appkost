const express = require('express');
const { getAllUsersReport } = require('../controllers/Report/userReport');
const { getKostReportById } = require('../controllers/Report/kostReport');
const { getUserByIdReport } = require('../controllers/Report/userByIdReport');
const { getAllFasilitasReport } = require('../controllers/Report/fasilitasReport');
const { getAllKostReport } = require('../controllers/Report/kostAllReport');
const { getAllHargaReport } = require('../controllers/Report/hargaReport');
const { getAllKeamananReport } = require('../controllers/Report/keamananReport');
const { getAllJarakReport } = require('../controllers/Report/jarakReport');
const { getAllLuasKamarReport } = require('../controllers/Report/luasKamarReport');

const router = express.Router();
router.get('/user', getAllUsersReport); // Laporan Semua Pengguna
router.get('/kost', getAllKostReport); // Laporan Semua Kost
router.get('/fasilitas', getAllFasilitasReport); // Laporan Semua Fasilita
router.get('/harga', getAllHargaReport); // Laporan Semua Fasilita
router.get('/keamanan', getAllKeamananReport); // Laporan Semua Fasilita
router.get('/jarak', getAllJarakReport); // Laporan Semua Fasilita
router.get('/luas', getAllLuasKamarReport); // Laporan Semua Fasilita
router.get('/user/:id', getUserByIdReport);
router.get('/kost/:kost_id', getKostReportById);

module.exports = router;
