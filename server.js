// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const kostRoutes = require('./routes/kostRoutes');
const imageRoutes = require('./routes/imageRoutes');
const kriteriaRoutes = require('./routes/kriteriaRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kost', kostRoutes);
app.use('/api/kriteria', kriteriaRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
