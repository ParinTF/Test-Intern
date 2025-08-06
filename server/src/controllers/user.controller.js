// server/src/controllers/user.controller.js
const User = require('../models/user.model');

// ดึงผู้ใช้งานทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
    // ... Logic for updating user ...
};

// Login (ต้องมีการเข้ารหัสรหัสผ่านและใช้ JWT)
exports.login = async (req, res) => {
    // ... Logic for authentication ...
};
