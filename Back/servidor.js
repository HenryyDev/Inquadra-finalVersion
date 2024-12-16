const express = require('express');
const cors = require('cors'); // Remova a duplicação
const db = require('./db'); // Importa a configuração do banco de dados
const app = express(); // Cria uma instância do Express
require('dotenv').config({ path: './bd.env' }); // Carrega as variáveis de ambiente do bd.env

// Middleware para parsear JSON
app.use(express.json());
app.use(cors)



// Rotas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const quadraRoutes = require('./routes/quadraRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const authRoutes = require("./routes/authRoutes");

app.use("/img", express.static("img"));

// Usar as rotas
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/quadras', quadraRoutes);
app.use('/reservas', reservaRoutes);
app.use("/reset", authRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  console.log("opa");
  res.send('¡Bienvenido al backend de InQuadra!');
});

// Defina a porta do servidor
const port = process.env.PORT || 3000; // Utiliza a variável PORT, ou 3000 por padrão


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
