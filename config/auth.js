const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Debug

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Debug

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT Error:', err.message); // Debug
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        console.log('Decoded Token:', decoded); // Debug
        req.user = decoded; // Simpan data user dari token ke dalam `req.user`
        next();
    });
};


// Middleware untuk memverifikasi peran admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have admin privileges' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
