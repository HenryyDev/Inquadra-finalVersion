const express = require("express");
const router = express.Router();
const {
  emailResetSenha,
  resetSenha,
} = require("../controllers/authController");
const authenticateJWT = require('../middlewares/authMiddleware')

// Rota para solicitar recuperação de senha
router.post("/esqueceu-senha", emailResetSenha);

// Rota para redefinir a senha
router.post("/reset-senha",authenticateJWT, resetSenha);

module.exports = router;
