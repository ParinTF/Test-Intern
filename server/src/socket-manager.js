const { Server } = require('socket.io');

let io; // สร้างตัวแปรไว้เก็บ instance ของ Socket.IO

/**
 * ฟังก์ชันสำหรับเริ่มต้นการทำงานของ Socket.IO
 * @param {http.Server} server - HTTP server ที่สร้างจาก Express
 */
function initializeSocket(server) {
  // กำหนดค่าให้กับ io instance
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",// อนุญาตการเชื่อมต่อจากทุกที่
      credentials: true, 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });

  console.log('✅ Socket.IO initialized successfully.');
  return io;
}

/**
 * ฟังก์ชันสำหรับส่ง event 'userUpdated' ไปยัง client ทุกคน
 * @param {object} data - ข้อมูลที่ต้องการส่งไปพร้อมกับ event
 */
function notifyUserUpdate(data) {
  if (!io) {
    // ป้องกันกรณีที่ยังไม่ถูก initialize
    console.error("Socket.IO has not been initialized yet.");
    return;
  }
  // ส่ง event ไปยัง client ทั้งหมด
  io.emit('userUpdated', data || { message: 'User data has been changed.' });
}

// Export ฟังก์ชันเพื่อให้ไฟล์อื่นเรียกใช้ได้
module.exports = {
  initializeSocket,
  notifyUserUpdate,
};