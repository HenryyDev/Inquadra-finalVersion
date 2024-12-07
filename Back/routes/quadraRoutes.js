const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const quadraController = require('../controllers/quadraController');
const upload = require('../middlewares/upload')

// Rotas para quadras
router.post('/', authenticateJWT, upload.array('imagens'), quadraController.createQuadra); 
// router.get('/', authenticateJWT, quadraController.getQuadra);
router.get('/id/:id', quadraController.getQuadraID);
router.get('/esporte', quadraController.getQuadraEsporte);
router.get("/anuncio-ativo",authenticateJWT,quadraController.getanunciosAtivos)
router.put('/:id', authenticateJWT, quadraController.updateQuadra);
router.delete('/:id', authenticateJWT, quadraController.deleteQuadra);
router.get('/quadras-destaque', quadraController.getDestaque);


module.exports = router;