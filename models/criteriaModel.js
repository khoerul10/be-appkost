// models/criteriaModel.js
const db = require('../config/db');
const uuid = require('uuid');

const getAllCriteria = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM kriteria', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const addNewCriteria = (name, weight, type) => {
    const criteriaId = uuid.v4();
    const query = 'INSERT INTO kriteria (kriteria_id, name, weight, type) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [criteriaId, name, weight, type], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { getAllCriteria, addNewCriteria };
