// models/userModel.js
const db = require('../config/db');
const uuid = require('uuid');

const createUser = (name, email, password, role) => {
    const userId = uuid.v4();
    const query = 'INSERT INTO users (user_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [userId, name, email, password, role], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    createUser
};
