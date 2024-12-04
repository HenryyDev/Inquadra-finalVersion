const db = require('../db');

const upload = require('../middlewares/upload'); // Middleware para upload das imagens, se necessário

exports.createQuadra = async (req, res) => {
    const {
        nome,
        descricao,
        preco_hora,
        cep,
        bairro,
        municipio,
        uf,
        logradouro,
        numero_e,
        ddd,
        numero_t,
    } = req.body;

    const { id_usuario } = req.user; // O id do usuário autenticado via JWT

    // Validação dos campos obrigatórios
    if (!nome || !preco_hora || !descricao || !cep || !uf || !municipio || !bairro || !logradouro || !numero_e) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Validação de imagens (se houver)
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("Nenhuma imagem foi enviada");
    }

    const imagens = req.files.map((file) => `/img/${file.filename}`);
    const esporteData = JSON.parse(req.body.esporte); // Exemplo: { futebol: true, basquete: false }
    const esporteValues = [
        esporteData.basquete || false,
        esporteData.futebol || false,
        esporteData.outros || false,
        esporteData.golfe || false,
        esporteData.natacao || false,
        esporteData.volei || false,
        esporteData.tenis || false,
        esporteData.pong || false,
        esporteData.skate || false,
        esporteData.futsal || false,
    ];

    const connection = await db.getConnection();
    try {
        // Iniciar a transação
        await connection.beginTransaction();

        // Inserir endereço
        const [cadastroEndereco] = await connection.execute(
            "INSERT INTO Endereco (cep, uf, municipio, bairro, logradouro, numero) VALUES (?, ?, ?, ?, ?, ?)",
            [cep, uf, municipio, bairro, logradouro, numero_e]
        );

        const id_endereco = cadastroEndereco.insertId;

        // Inserir esportes
        const sql_esporte = `INSERT INTO Esportes (basquete, futebol, outros, golfe, natacao, volei, tenis, pong, skate, futsal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [cadastroEsporte] = await connection.execute(sql_esporte, esporteValues);
        const id_esporte = cadastroEsporte.insertId;

        // Inserir quadra
        const [cadastroQuadra] = await connection.execute(
            "INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco, fk_usuario) VALUES (?, ?, ?, ?, ?)",
            [nome, descricao, preco_hora, id_endereco, id_usuario]
        );

        const id_quadra = cadastroQuadra.insertId;

        // Associar relação entre esportes e quadra
        const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES ?`;
        const esportesAssociados = esporteValues
            .map((esporte, index) => (esporte ? [id_esporte, id_quadra] : null)) // Adiciona apenas os esportes "true"
            .filter((item) => item !== null); // Remove valores nulos

        await connection.query(sql_relacao, [esportesAssociados]);

        // Inserir imagens
        const sql_imagens = `INSERT INTO Imagem (caminho, fk_quadra) VALUES ?`;
        const valores_imagens = imagens.map((caminho) => [caminho, id_quadra]);
        await connection.query(sql_imagens, [valores_imagens]);

        // Confirmar transação
        await connection.commit();

        // Resposta de sucesso
        res.status(201).json({
            message: "Quadra criada com sucesso",
            quadra: {
                nome,
                descricao,
                preco_hora,
                esporte: esporteData,
                endereco: {
                    cep,
                    bairro,
                    municipio,
                    uf,
                    logradouro,
                    numero_e,
                },
                imagens,
            },
        });
    } catch (error) {
        // Reverter transação em caso de erro
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: "Erro ao criar a quadra", details: error.message });
    } finally {
        // Liberar a conexão com o banco
        connection.release();
    }
};


// Obter todas as quadras
exports.getQuadra = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const [quadras] = await connection.execute('SELECT * FROM Quadra');

        if (quadras.length === 0) {
            return res.status(404).json({ error: 'Nenhuma quadra encontrada' });
        }

        res.status(200).json(quadras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as quadras' });
    } finally {
        connection.release();
    }
};

// Obter unm quadra por ID
exports.getQuadraID = async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        const [quadra] = await connection.execute('SELECT * FROM Quadra WHERE id_quadra = ?', [id]);

        if (quadra.length === 0) {
            return res.status(404).json({ error: 'Quadra não encontrada' });
        }

        res.status(200).json(quadra[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter a quadra' });
    } finally {
        connection.release();
    }
};

// Atualizar uma quadra
exports.updateQuadra = async (req, res) => {
    const { id } = req.params;
    const { nome, preco_hora, fk_endereco, descricao } = req.body;

    if (!nome || !preco_hora || !fk_endereco || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'UPDATE Quadra SET nome = ?, preco_hora = ?, fk_endereco = ?, descricao = ? WHERE id_quadra = ?',
            [nome, preco_hora, fk_endereco, descricao, id]
        );

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Quadra atualizada com sucesso' });
        } else {
            res.status(404).json({ error: 'Quadra não encontrada' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a quadra' });
    } finally {
        connection.release();
    }
};

// Deletar uma quadra
exports.deleteQuadra = async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute('DELETE FROM Quadra WHERE id_quadra = ?', [id]);

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Quadra deletada com sucesso' });
        } else {
            res.status(404).json({ error: 'Quadra não encontrada' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar a quadra' });
    } finally {
        connection.release();
    }
};
