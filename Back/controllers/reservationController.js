const db = require('../db');

// Criar uma nova reservação
exports.createReservation = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO Administrador (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
        res.status(201).json({ message: 'Administrador criado com sucesso', id_administrador: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o administrador' });
    }
};

// Obter todas as reservações
exports.getAdmin = async (req, res) => {
    try {
        const [administradores] = await db.execute('SELECT * FROM Administrador');
        res.status(200).json(administradores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os administradores' });
    }
};

// Obter uma reservação por ID
exports.getAdmin = async (req, res) => {
    const { id_administrador } = req.params;
    try {
        const [administrador] = await db.execute('SELECT * FROM Administrador WHERE id_administrador = ?', [id_administrador]);
        if (administrador.length > 0) {
            res.status(200).json(administrador[0]);
        } else {
            res.status(404).json({ error: 'Administrador não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter o administrador' });
    }
};

// Atualizar uma reservação
exports.updateAdmin = async (req, res) => {
    const { id_administrador } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const [result] = await db.execute('UPDATE Administrador SET nome = ?, email = ?, senha = ? WHERE id_administrador = ?', [nome, email, senha, id_administrador]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Administrador atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Administrador não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o administrador' });
    }
};

// Deletar uma reservação
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM Administrador WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Administrador deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Administrador não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o administrador' });
    }
};