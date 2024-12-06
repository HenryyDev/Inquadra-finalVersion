const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Rotas para usuarios
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserID);
router.put('/:id', authenticateJWT, userController.updateUser);
router.put('/senha/:id', authenticateJWT, userController.trocarSenha);
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;