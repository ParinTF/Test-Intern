const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'no token provided' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'token error' });
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id; // Assuming the token contains user ID
        next();
    } catch (error) {
        return res.status(401).json({ message: 'invalid token' });
    }
};