const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "*"
}));
app.use(express.json()); // Para ler o corpo das requisições como JSON

const port = 3000;

// Cadastro de quadras
app.post('/cadastro-anuncio', (req, res) => {
    const { nome, descricao, preco_hora, esporte, cep, bairro, municipio, uf, logradouro, numero_e, ddd, numero_t, fk_esporte, fk_quadra } = req.body;

    // Cadastrando o esporte
    const sql_esporte = `INSERT INTO Esporte (esporte) VALUES (?)`;
    db.query(sql_esporte, [esporte], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir esporte: ', erro);
            return res.status(500).send('Erro ao cadastrar esporte');
        }

        // Pegando o ID do esporte
        const id_esporte = resultado.insertId;

        // Cadastrando o endereço
        const sql_endereco = `INSERT INTO Endereco (cep, logradouro, numero_e, bairro, municipio, uf) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql_endereco, [cep, logradouro, numero_e, bairro, municipio, uf], (erro, resultado) => {
            if (erro) {
                console.error('Erro ao inserir endereço: ', erro);
                return res.status(500).send('Erro ao cadastrar endereço');
            }

            // Pegando o ID do endereço
            const id_endereco = resultado.insertId;

            // Cadastrando a quadra
            const sql_quadra = `INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco) VALUES (?, ?, ?, ?)`;
            db.query(sql_quadra, [nome, descricao, preco_hora, id_endereco], (erro, resultado) => {
                if (erro) {
                    console.error('Erro ao inserir quadra: ', erro);
                    return res.status(500).send('Erro ao cadastrar quadra');
                }

                // Pegando o ID da quadra
                const id_quadra = resultado.insertId;

                // Cadastrando o telefone
                const sql_telefone = `INSERT INTO Telefone (ddd, numero_t) VALUES (?, ?)`;
                db.query(sql_telefone, [ddd, numero_t], (erro, resultado) => {
                    if (erro) {
                        console.error('Erro ao inserir telefone: ', erro);
                        return res.status(500).send('Erro ao cadastrar telefone');
                    }

                    // Cadastrando a relação entre esporte e quadra
                    const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES (?, ?)`;
                    db.query(sql_relacao, [id_esporte, id_quadra], (erro, resultado) => {
                        if (erro) {
                            console.error('Erro ao cadastrar relação entre esporte e quadra: ', erro);
                            return res.status(500).send('Erro ao cadastrar relação');
                        }

                        // Se tudo deu certo, enviamos a resposta
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
