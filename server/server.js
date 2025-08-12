// server.js

// 1. IMPORT DEPENDENCIES และ MODULES ที่จำเป็น
// ----------------------------------------------------------------
require('dotenv').config(); // โหลดค่าจากไฟล์ .env เข้าสู่ process.env เป็นอันดับแรกเสมอ
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database'); // Import instance ของ sequelize ที่ตั้งค่าไว้แล้ว
const userRoutes = require('./src/routes/user.routes'); // Import router สำหรับจัดการผู้ใช้

// Import Models เพื่อให้ Sequelize รู้จักและสามารถ sync ได้
require('./src/models/user.model'); 


// 2. INITIALIZE EXPRESS APP
// ----------------------------------------------------------------
const app = express();


// 3. CONFIGURE MIDDLEWARE
// ----------------------------------------------------------------
app.use(cors()); // อนุญาตให้ Frontend (จากคนละ Origin) เรียกใช้ API ได้
app.use(express.json()); // ทำให้ Express สามารถอ่านและแปลง Request Body ที่เป็น JSON ได้ (จำเป็นสำหรับ req.body)


// 4. DEFINE ROUTES
// ----------------------------------------------------------------
// Route พื้นฐานสำหรับทดสอบว่า Server ทำงานอยู่หรือไม่
app.get('/', (req, res) => {
  res.send('User Management API Server is running...');
});

// ใช้ User Routes ที่เราสร้างไว้สำหรับทุกเส้นทางที่ขึ้นต้นด้วย /api/users
// เช่น GET /api/users, POST /api/users/login
app.use('/api/users', userRoutes);


// 5. DATABASE CONNECTION & SERVER STARTUP
// ----------------------------------------------------------------
const PORT = process.env.PORT || 5000; // ดึง Port จาก .env หรือใช้ 5000 เป็นค่าเริ่มต้น

// sequelize.sync() จะทำการตรวจสอบ Models ทั้งหมดและสร้างตารางในฐานข้อมูลให้ถ้ายังไม่มี
// เราจะเริ่มรันเซิร์ฟเวอร์หลังจากที่ฐานข้อมูลพร้อมใช้งานแล้วเท่านั้น
sequelize
  .sync({ force: false }) // force: false หมายถึงจะไม่ลบและสร้างตารางใหม่ทุกครั้งที่รัน
  .then(() => {
    console.log('✅ Database synchronized successfully.');
    
    // เริ่มรันเซิร์ฟเวอร์หลังจากที่ฐานข้อมูลพร้อมแล้ว
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to synchronize the database:', err);
  });