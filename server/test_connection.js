// test_connection.js

// 1. นำเข้า sequelize instance ที่เราตั้งค่าไว้แล้ว
// **สำคัญ:** ตรวจสอบให้แน่ใจว่า path ไปยังไฟล์ database.js ของคุณถูกต้อง
const sequelize = require('./src/config/database'); 

// 2. สร้างฟังก์ชัน async เพื่อทดสอบการเชื่อมต่อ
const testConnection = async () => {
  console.log('กำลังพยายามเชื่อมต่อฐานข้อมูล...');
  try {
    // ลองยืนยันตัวตนกับฐานข้อมูล
    await sequelize.authenticate();
    console.log('✅ การเชื่อมต่อสำเร็จ!');
  } catch (error) {
    console.error('❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:');
    console.error(error); // แสดง error แบบละเอียด
  } finally {
    // 3. ปิดการเชื่อมต่อหลังทดสอบเสร็จ 
    await sequelize.close();
  }
};

// 4. เรียกใช้ฟังก์ชันเพื่อทดสอบ
testConnection();