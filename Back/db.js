const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST, // Usando a variável de ambiente para o host
  user: process.env.MYSQL_USER, // Usando a variável de ambiente para o usuário
  password: process.env.MYSQL_PASSWORD, // Usando a variável de ambiente para a senha
  database: process.env.MYSQL_DATABASE, // Usando a variável de ambiente para o nome do banco de dados
  port: process.env.MYSQL_PORT, // Usando a variável de ambiente para a porta
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
