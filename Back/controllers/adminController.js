const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Criar um novo administrador
exports.createAdmin = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    const connection = await db.getConnection();

    try {
        const [existingAdmin] = await connection.execute('SELECT * FROM Administrador WHERE email = ?', [email]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        await connection.beginTransaction();

        const [adminResult] = await connection.execute(
            'INSERT INTO Administrador (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        const id_administrador = adminResult.insertId;

        await connection.execute(
            'INSERT INTO Telefone (ddd, numero_t, fk_administrador) VALUES (?, ?, ?)',
            [ddd, numero_t, id_administrador]
        );

        await connection.commit();

        res.status(201).json({
            message: 'Administrador criado com sucesso',
            id_administrador,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o administrador' });
        await connection.rollback();
    } finally {
        connection.release();
    }
};

// Autenticando um administrador
exports.loginAdmin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const [admin] = await db.execute('SELECT * FROM Administrador WHERE email = ?', [email]);
        if (admin.length === 0) {
            return res.status(400).json({ error: 'Email ou senha incorretos' });
        }

        const eCompativel = await bcrypt.compare(senha, admin[0].senha);
        if (!eCompativel) {
            return res.status(400).json({ error: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
            { id_administrador: admin[0].id_administrador },
            'tu_clave_secreta',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Autenticado com sucesso',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

// Obter todos os administradores
exports.getAdmin = async (req, res) => {
    try {
        const [administradores] = await db.execute('SELECT * FROM Administrador');
        res.status(200).json(administradores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os administradores' });
    } finally {
        connection.release();
    }
};

// Obter um administrador por ID
exports.getAdminID = async (req, res) => {
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
    } finally {
        connection.release();
    }
};

// Atualizar um administrador
exports.updateAdmin = async (req, res) => {
    const { id_administrador } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [adminResult] = await connection.execute(
            'UPDATE Administrador SET nome = ?, email = ?, senha = ? WHERE id_administrador = ?',
            [nome, email, senha, id_administrador]
        );

        await connection.commit();

        if (adminResult.affectedRows > 0) {
            res.status(200).json({ message: 'Administrador atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Administrador não encontrado' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o administrador' });
    } finally {
        connection.release();
    }
};

// Deletar um administrador
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [deletarTelefone] = await connection.execute('DELETE FROM Telefone WHERE id = ?', [id]);

        const [deletarAdmin] = await connection.execute('DELETE FROM Administrador WHERE id = ?', [id]);

        await connection.commit();

        if (deletarTelefone.affectedRows > 0 && deletarAdmin.affectedRows > 0) {
            res.status(200).json({ message: 'Administrador deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Administrador não encontrado' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o administrador' });
    } finally {
        connection.release();
    }
};