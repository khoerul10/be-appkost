require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', routes.authRoutes);
app.use('/api/kost', routes.kostRoutes);
app.use('/api/kriteria', routes.kriteriaRoutes);
app.use('/api/user', routes.userRoutes);
app.use('/api/spk', routes.spkRoutes);
app.use('/api/rekomendasi', routes.rekomendasiRoutes);

app.get("/", (req, res) => {
    res.json({message: "Backend kost"})
})
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
