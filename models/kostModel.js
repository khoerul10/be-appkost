// models/kostModel.js
const db = require('../config/db');
const uuid = require('uuid');

const createKostModel = (nama_kost, alamat, harga, fasilitas, deskripsi, foto, latitude, longitude) => {
    const kostId = uuid.v4();
    const query = 'INSERT INTO kost (kost_id, nama_kost, alamat, harga, fasilitas, deskripsi, foto, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [kostId, nama_kost, alamat, harga, fasilitas, deskripsi, foto, latitude, longitude], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const getKosts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM kost', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getKostsBySearch = (search) => {
    let query = 'SELECT * FROM kost WHERE 1=1';
    const params = [];

    // Sesuaikan logika berdasarkan nilai `search`
    if (search) {
        query += ' AND (nama_kost LIKE ? OR alamat LIKE ? OR fasilitas LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getKostById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM kost WHERE kost_id = ?', [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { createKostModel, getKosts, getKostById, getKostsBySearch };
