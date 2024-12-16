const mysql = require('mysql2');
require('dotenv').config();  // Carrega as variáveis de ambiente do .env

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
