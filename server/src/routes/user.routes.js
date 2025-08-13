
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/search', authMiddleware, userController.searchUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.post('/', authMiddleware, userController.addUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

// router.get('/search', userController.searchUser);
// router.get('/', userController.getAllUsers);
// router.post('/', userController.addUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
