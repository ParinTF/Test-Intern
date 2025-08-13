const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    console.log('\n\nAuthorization Header:', req.headers.authorization);
    
    // 1. ดึง token จาก Authorization Header หรือ cookie
    const bearerToken = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies?.token;
    const token = bearerToken || cookieToken;

    // 2. ถ้าไม่มี token ทั้งใน Header และ cookie ให้ปฏิเสธ
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided.' });
    }

    try {
        // 3. ตรวจสอบความถูกต้องของ token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. เก็บ id ของผู้ใช้ไว้ใน request object
        req.userId = decoded.id;
        
        // ไปยัง middleware หรือ controller ตัวถัดไป
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
    }
};