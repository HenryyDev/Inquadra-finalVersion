const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// Rotas para administradores
router.post('/', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', adminController.getAdmin);
router.get('/id/:id', adminController.getAdminID);
router.put('/:id', authenticateJWT, adminController.updateAdmin);
router.delete('/:id', authenticateJWT, adminController.deleteAdmin);

module.exports = router;