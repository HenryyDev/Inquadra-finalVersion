const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const quadraController = require('../controllers/quadraController');
const upload = require('../middlewares/upload')

// Rotas para quadras
router.post('/', authenticateJWT, upload.array('imagens'), quadraController.createQuadra); 
router.get('/', authenticateJWT, quadraController.getQuadra);
router.get('/:id', authenticateJWT, quadraController.getQuadraID);
router.put('/:id', authenticateJWT, quadraController.updateQuadra);
router.delete('/:id', authenticateJWT, quadraController.deleteQuadra);

module.exports = router;