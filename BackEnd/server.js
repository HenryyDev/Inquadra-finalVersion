const express = require('express');
const db = require('./db');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/img', express.static('img'));

const port = 3000;

// Configuração do armazenamento do multer
const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/'); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({ storage: armazenamento }); // Instância do multer

// Rota de cadastro de quadras com upload de imagens
app.post('/cadastro-anuncio', upload.array('imagens', 5), (req, res) => {
    const {
        nome, descricao, preco_hora, esporte,
        cep, bairro, municipio, uf, logradouro,
        numero_e, ddd, numero_t
    } = req.body;

    // Verificar se imagens foram enviadas
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Nenhuma imagem foi enviada');
    }

    const imagens = req.files.map(file => `/img/${file.filename}`);

    console.log(imagens);  // Verifique se as imagens estão sendo capturadas corretamente

    // Cadastrando o esporte
    const sql_esporte = `INSERT INTO Esportes (basquete, futebol, outros, golfe, natacao, volei, tenis, pong, skate, futsal)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const esporteData = [
        esporte.basquete ? 1 : 0,
        esporte.futebol ? 1 : 0,
        esporte.outros ? 1 : 0,
        esporte.golfe ? 1 : 0,
        esporte.natacao ? 1 : 0,
        esporte.volei ? 1 : 0,
        esporte.tenis ? 1 : 0,
        esporte.pong ? 1 : 0,
        esporte.skate ? 1 : 0,
        esporte.futsal ? 1 : 0
    ];

    db.query(sql_esporte, esporteData, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir esporte:', erro);
            return res.status(500).send('Erro ao cadastrar esporte');
        }

        const id_esporte = resultado.insertId;

        // Cadastrando o endereço
        const sql_endereco = `INSERT INTO Endereco (cep, logradouro, numero_e, bairro, municipio, uf) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql_endereco, [cep, logradouro, numero_e, bairro, municipio, uf], (erro, resultado) => {
            if (erro) {
                console.error('Erro ao inserir endereço:', erro);
                return res.status(500).send('Erro ao cadastrar endereço');
            }

            const id_endereco = resultado.insertId;

            // Cadastrando a quadra
            const sql_quadra = `INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco) VALUES (?, ?, ?, ?)`;
            db.query(sql_quadra, [nome, descricao, preco_hora, id_endereco], (erro, resultado) => {
                if (erro) {
                    console.error('Erro ao inserir quadra:', erro);
                    return res.status(500).send('Erro ao cadastrar quadra');
                }

                const id_quadra = resultado.insertId;

                // Inserindo imagens na tabela Imagem
                const sql_imagens = `INSERT INTO Imagem (caminho, fk_quadra) VALUES ?`;
                const valores_imagens = imagens.map(caminho => [caminho, id_quadra]);

                console.log(valores_imagens); // Verifique se os dados estão formatados corretamente

                db.query(sql_imagens, [valores_imagens], (erro) => {
                    if (erro) {
                        console.error('Erro ao salvar imagens:', erro);
                        return res.status(500).send('Erro ao salvar imagens');
                    }

                    // Relacionando esporte e quadra
                    const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES (?, ?)`;
                    db.query(sql_relacao, [id_esporte, id_quadra], (erro) => {
                        if (erro) {
                            console.error('Erro ao cadastrar relação entre esporte e quadra:', erro);
                            return res.status(500).send('Erro ao cadastrar relação');
                        }

                        res.send('Quadra cadastrada com sucesso');
                    });
                });
            });
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
