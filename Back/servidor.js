const express = require('express');
const cors= require ("cors")
const db = require('./db'); // Importa la configuración de la base de datos
const app = express(); // Crear una instancia de Express
const port = 3000; // Puerto donde correrá el servidor

// Middleware para parsear JSON
app.use(express.json());
app.use(cors({ origin: "*" }));
// Rotas
// Importar as rotas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const quadraRoutes = require('./routes/quadraRoutes');

// Usar as rotas
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/quadras', quadraRoutes);


// Aquí importaremos y usaremos las rutas más adelante
// Ejemplo:
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend de InQuadra!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
