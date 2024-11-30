const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing or invalid' });
    }

    const accessToken = authHeader.split(' ')[1];
    

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        console.log('decoded', decoded)

        req.user = decoded; // Simpan data user dari token ke dalam `req.user`
        next();
    });
};

// Middleware untuk memverifikasi peran admin
const isAdmin = (req, res, next) => {
    console.log('decoded req.user', req)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have admin privileges' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
