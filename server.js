// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const kostRoutes = require('./routes/kostRoutes');
const criteriaRoutes = require('./routes/criteriaRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kost', kostRoutes);
app.use('/api/criteria', criteriaRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
