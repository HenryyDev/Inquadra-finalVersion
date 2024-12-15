const mysql = require('mysql2');
require('dotenv').config(); // Carregar as variáveis de ambiente

const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Use a variável de ambiente
  user: process.env.DB_USER,        // Use a variável de ambiente
  password: process.env.DB_PASSWORD, // Use a variável de ambiente
  database: process.env.DB_NAME,     // Use a variável de ambiente
  port: process.env.DB_PORT || 3306, // Defina a porta do MySQL, com fallback para 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
