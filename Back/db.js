const mysql = require('mysql2');
require('dotenv').config();  // Carrega as variáveis de ambiente do .env

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,       // Host do banco de dados (por exemplo, "localhost" ou o host do Railway)
  user: process.env.MYSQL_USER,       // Nome de usuário do banco de dados
  password: process.env.MYSQL_PASSWORD, // Senha do banco de dados
  database: process.env.MYSQL_DATABASE, // Nome do banco de dados
  port: process.env.MYSQL_PORT,       // Porta do banco de dados (geralmente 3306 para MySQL)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
