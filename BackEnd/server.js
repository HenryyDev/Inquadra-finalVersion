const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const port = 3000;
const cors = require('cors');
const flatted = require('flatted');


app.use(cors({
    origin: "*"
}));
app.use(express.json())

//Cadastro quadras 

app.post('/cadastro-anuncio', (req, res) => {
    // const values = [
    //     //Nome = titulo da quadra
    //     req.body.nome,
    //     req.body.descricao,
    //     req.body.preco_hora,
    //     req.body.esporte,
    //     req.body.cep,
    //     req.body.bairro,
    //     req.body.municipio,
    //     req.body.uf,
    //     req.body.logradouro,
    //     req.body.numero_e,
    //     req.body.ddd,
    //     req.body.numero_t
    // ];

    const { nome, descricao, preco_hora, esporte, cep, bairro, municipio, uf, logradouro, numero_e, ddd, numero_t, fk_esporte, fk_quadra } = req.body

    //Cadastrando as descrições   

    //Cadastrando os esportes
    const sql_esporte = `INSERT INTO Esporte (esporte) VALUES (?)`;
    db.query(sql_esporte, [esporte], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados: ', erro);
            res.status(500).send('Erro ao cadastrar esporte');
            return;
        }
        //res.send('Esporte cadastrada');
    });

    //Pegando o id dos esportes
    const id_esporte = `LAST_INSERT_ID()`;
    const value_esporte = db.query(id_esporte, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao selecionar dados: ', erro);
            res.status(500).send('Erro ao procurar o ID');
            return;
        }
    });


    //Cadastrando o endereço 
    const sql_endereco = `INSERT INTO Endereco (cep, logradouro, numero_e, bairro, municipio, uf) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql_endereco, [cep, logradouro, numero_e, bairro, municipio, uf], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados: ', erro);
            res.status(500).send('Erro ao cadastrar endereco');
            return;
        }
        //res.send('Endereco cadastrado');
    });

    //Pegando o id dos enderecos
    const id_endereco = `LAST_INSERT_ID()`;
    const value_endereco = db.query(id_endereco, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao selecionar dados: ', erro);
            res.status(500).send('Erro ao procurar o ID');
            return;
        }
    });


    const sql_quadra = `INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco) VALUES (?, ?, ?, ?)`;
    db.query(sql_quadra, [nome, descricao, preco_hora, id_endereco], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados: ', erro);
            res.status(500).send('Erro ao cadastrar a quadra');
            return;

        }
        res.send('Quadra quase cadastrada');
    });

    //Pegando o id das quadras
    const id_quadra = `LAST_INSERT_ID()`;
    const value_quadra = db.query(id_quadra, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao selecionar dados: ', erro);
            res.status(500).send('Erro ao procurar o ID');
            return;
        }
    });

    //Cadastrando os telefones
    const sql_telefone = `INSERT INTO Telefone (ddd, numero_t) VALUES (?, ?)`;
    db.query(sql_telefone, [ddd, numero_t], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados: ', erro);
            res.status(500).send('Erro ao cadastrar telefone');
            return;
        }
        //res.send('Numero cada');
    });

    //Cadastrando a relacao entre esportes e quadras
    const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES (?, ?)`;
    db.query(sql_relacao, [fk_esporte, fk_quadra], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados: ', erro);
            res.status(500).send('Erro ao cadastrar telefone');
            return;
        }
        //res.send('Numero cada');
    });
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


