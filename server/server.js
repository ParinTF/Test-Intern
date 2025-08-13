// 1. IMPORT DEPENDENCIES
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/user.routes');
const { initializeSocket } = require('./src/socket-manager'); // << แก้ไขตรงนี้: import ตัว initialize
const cookieParser = require('cookie-parser'); //import cookie-parser
require('./src/models/user.model');

// 2. INITIALIZE APP & SERVER
const app = express();
const server = http.createServer(app);

// 3. CONFIGURE MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
// 4. CONFIGURE SOCKET.IO
initializeSocket(server); // << แก้ไขตรงนี้: เรียกใช้ฟังก์ชันเพื่อเริ่ม Socket.IO

// 5. DEFINE ROUTES
app.get('/', (req, res) => {
  res.send('User Management API Server with Socket.IO is running...');
});
app.use('/api/users', userRoutes);

// 6. DATABASE CONNECTION & SERVER STARTUP
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ Database synchronized successfully.');
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to synchronize the database:', err);
  });

// 7. EXPORT (ไม่จำเป็นต้อง export อะไรจากไฟล์นี้แล้ว)
// module.exports = { notifyUserUpdate }; // << ลบบรรทัดนี้ทิ้ง
