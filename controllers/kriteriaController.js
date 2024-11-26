const { getFasilitas, getHarga, getJarak, getKeamanan, getLuasKamar } = require("../models/kriteriaModels");

const getFasilitasHandler = (req, res) => {
    getFasilitas()
        .then(kosts => res.status(200).json(kosts))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getHargaHandler = (req, res) => {
    getHarga()
        .then(kosts => res.status(200).json(kosts))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getJarakHandler = (req, res) => {
    getJarak()
        .then(kosts => res.status(200).json(kosts))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getKeamananHandler = (req, res) => {
    getKeamanan()
        .then(kosts => res.status(200).json(kosts))
        .catch(err => res.status(500).json({ error: err.message }));
};


const getLuasKamarHandler = (req, res) => {
    getLuasKamar()
        .then(kosts => res.status(200).json(kosts))
        .catch(err => res.status(500).json({ error: err.message }));
};



module.exports =  {getFasilitasHandler, getHargaHandler,getJarakHandler, getKeamananHandler, getLuasKamarHandler}