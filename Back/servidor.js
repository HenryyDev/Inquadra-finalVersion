const express = require('express');
const cors= require ("cors")
const db = require('./db'); // Importa la configuración de la base de datos
const app = express(); // Crear una instancia de Express
require('dotenv').config({ path: './bd.env' }); // Carrega as variáveis do bd.env


// Middleware para parsear JSON
app.use(express.json());
const cors = require("cors");

const corsOptions = {
  origin: [
    'https://inquadra-final-version-72wxmkif3-henrys-projects-75c338a9.vercel.app',  // URL do frontend na Vercel
    'http://localhost:5173'  // URL para desenvolvimento local, se necessário
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite enviar cookies, se necessário
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

app.use(cors(corsOptions));




// Ativar o CORS
app.use(cors(corsOptions));
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
const port = process.env.MYSQL_PORT; // Puerto donde correrá el servidor
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
