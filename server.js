const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/authRoutes');
const kostRoutes = require('./routes/kostRoutes');
const imageRoutes = require('./routes/imageRoutes');
const kriteriaRoutes = require('./routes/kriteriaRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Tambahkan middleware CORS
app.use(bodyParser.json());

// Routes
app.use('/api/image', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kost', kostRoutes);
app.use('/api/kriteria', kriteriaRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
