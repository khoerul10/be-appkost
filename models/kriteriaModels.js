const db = require('../config/db');

const getHarga = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM harga', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getBobot = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM bobot', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getKeamanan = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM keamanan', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getJarak = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM jarak', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getLuasKamar = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM luaskamar', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getFasilitas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fasilitas', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};


module.exports = {getHarga, getBobot,getKeamanan, getJarak, getLuasKamar, getFasilitas}