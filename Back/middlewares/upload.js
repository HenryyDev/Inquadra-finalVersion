const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Diretório onde as imagens serão salvas
const uploadDirectory = path.resolve(__dirname, '../img'); // Caminho absoluto

// Verificar se o diretório existe, caso contrário, cria-lo
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configuração do armazenamento das imagens
const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Usar o caminho absoluto
  },
  filename: (req, file, cb) => {
    // Nome único para cada arquivo, baseado no timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware de upload
const upload = multer({ storage: armazenamento });

module.exports = upload;
