const db = require('../db');

// Criar uma quadra
exports.createQuadra = async (req, res) => {
    const { nome, preco_hora, descricao, cep, uf, municipio, bairro, logradouro, numero_e, caminho } = req.body;
    const { id_administrador } = req.user;

    if (!nome || !preco_hora || !descricao || !cep || !uf || !municipio || !bairro || !logradouro || !numero_e || !caminho) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [cadastroEndereco] = await connection.execute(
            'INSERT INTO Endereco (cep, uf, municipio, bairro, logradouro, numero_e) VALUES (?, ?, ?, ?, ?)',
            [cep, uf, municipio, bairro, logradouro, numero_e]
        );

        const id_endereco = adminResult.insertId;

        const [cadastroQuadra] = await connection.execute(
            'INSERT INTO Quadra (nome, preco_hora, fk_endereco, fk_administrador, descricao) VALUES (?, ?, ?, ?, ?)',
            [nome, preco_hora, id_endereco, id_administrador, descricao]
        );

        const [cadastroImagem] = await connection.execute(
            'INSERT INTO Imagem (caminho, preco_hora) VALUES (?, ?, ?, ?, ?)',
            [nome, preco_hora, fk_endereco, id_administrador, descricao]
        );

        await connection.commit();

        res.status(201).json({
            message: 'Quadra criada com sucesso',
            id_quadra: result.insertId
        });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a quadra' });
    } finally {
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
