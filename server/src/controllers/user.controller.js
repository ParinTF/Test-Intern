// server/src/controllers/user.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // สำหรับการค้นหาผู้ใช้
// ดึงผู้ใช้งานทั้งหมด

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
exports.register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, cardId, birthDate } = req.body;
    // เช็คว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      cardId,
      birthDate
    });

    const safeUser = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      cardId: newUser.cardId,
      birthDate: newUser.birthDate,
      username: newUser.username
    };

    res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    // ค้นหาผู้ใช้ตามชื่อผู้ใช้
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id , username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ใช้ secure cookie ใน production
      sameSite: 'Strict', // ป้องกัน CSRF
      maxAge: 3600000 // 1 hour
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      cardId: user.cardId,
      birthDate: user.birthDate,
      username: user.username
    };

    res.status(200).json({ message: 'Login successful', token, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.searchUser = async (req, res) => {
  try {
    let { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: 'Username query parameter is required' });
    }

    username = String(username).trim();
    if (username.length > 100) {
      return res.status(400).json({ message: 'Username query parameter is too long' });
    }
    const user = await User.findOne({ where: { username: { [Op.like]: username } },
      attributes: ['id', 'firstName', 'lastName', 'cardId', 'birthDate', 'username']
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      cardId: user.cardId,
      birthDate: user.birthDate,
      username: user.username
    };
    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: 'Error searching user', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, {
            where: { id }
        });

        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}


