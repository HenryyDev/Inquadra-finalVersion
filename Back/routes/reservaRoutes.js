const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const reservaController = require('../controllers/reservaController');

// Rotas para quadras
router.post('/cadastro',authenticateJWT, reservaController.createReserva);
router.get('/', authenticateJWT, reservaController.getReserva);
router.get('/id', authenticateJWT, reservaController.getReservaID);
router.put('/:id', authenticateJWT, reservaController.updateReserva);
router.delete('/:id_reserva', authenticateJWT, reservaController.deleteReserva);
router.post('/avaliacao',authenticateJWT,reservaController.createAvaliacao)

module.exports = router;