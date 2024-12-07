const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const dotenv = require('dotenv');

dotenv.config();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "inquadra2024@gmail.com",
    pass: "feqwotjwhecnjpzx",
  },
});

// Função para enviar o email de recuperação
const emailResetSenha = async (req, res) => {
    const { email } = req.body;
  
    try {
      const [rows] = await db.query('SELECT id_usuario FROM Usuario WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      const userId = rows[0].id_usuario;
  
      // Gera um token de recuperação de senha válido por 1 hora
      const token = jwt.sign({ id: userId }, "tu_clave_secreta", { expiresIn: '1h' });
  
      const resetLink = `http://localhost:5173/redefinir-senha/${token}`;
  
      const mailOptions = {
        from: "inquadra2024@gmail.com",
        to: email,
        subject: 'Recuperação de senha',
        text: `Clique no link abaixo para recuperar sua senha:\n${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).send('Email de recuperação enviado');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao enviar email');
    }
  };

// Função para resetar a senha
const resetSenha = async (req, res) => {
    const {  newPassword } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
      // Verifica o token de redefinição de senha
      const decoded = jwt.verify(token, "tu_clave_secreta");
        console.log(decoded.id)
      // Busca o usuário pelo ID decodificado do token
      const [rows] = await db.query('SELECT id_usuario, senha FROM Usuario WHERE id_usuario = ?', [decoded.id]);
  
      if (rows.length === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
  
      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Atualiza a senha do usuário
      await db.query('UPDATE Usuario SET senha = ? WHERE id_usuario = ?', [hashedPassword, decoded.id]);
  
      res.status(200).send('Senha alterada com sucesso');
    } catch (error) {
      console.error(error);
      res.status(400).send('Token inválido ou expirado');
    }
  };
  

module.exports = {
  emailResetSenha,
  resetSenha,
};
