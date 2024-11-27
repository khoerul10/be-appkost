const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes'); // Impor sebagai namespace

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/image', routes.imageRoutes);
app.use('/api/auth', routes.authRoutes);
app.use('/api/kost', routes.kostRoutes);
app.use('/api/kriteria', routes.kriteriaRoutes);
app.use('/api/user', routes.userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
