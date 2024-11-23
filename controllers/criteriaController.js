const { getAllCriteria, addNewCriteria } = require('../models/criteriaModel');

// Mengambil semua kriteria
const getCriteria = (req, res) => {
    getAllCriteria()
        .then(kriteria => res.status(200).json(kriteria))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Menambahkan kriteria baru (hanya admin)
const addCriteria = (req, res) => {
    const { name, weight, type } = req.body;

    // Validasi input
    if (!name || !weight || !type) {
        return res.status(400).json({ message: 'All fields are required: name, weight, type' });
    }

    addNewCriteria(name, weight, type)
        .then(newCriteria => res.status(201).json({ message: 'Criteria added successfully', data: newCriteria }))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { getCriteria, addCriteria };
