const express = require('express');
const cors= require ("cors")
const db = require('./db'); // Importa la configuración de la base de datos
const app = express(); // Crear una instancia de Express


// Middleware para parsear JSON
app.use(express.json());
app.use(cors());
// Rotas
// Importar as rotas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const quadraRoutes = require('./routes/quadraRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const authRoutes= require("./routes/authRoutes")
app.use("/img", express.static("img"));

// Usar as rotas
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/quadras', quadraRoutes);
app.use('/reservas', reservaRoutes);
app.use("/reset",authRoutes)

// Aquí importaremos y usaremos las rutas más adelante
// Ejemplo:
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  console.log("opa")
  res.send('¡Bienvenido al backend de InQuadra!');
});
const port = 3000 || process.env.PORT; // Puerto donde correrá el servidor
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
