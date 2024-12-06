const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Criar um novo usuario
exports.createUser = async (req, res) => {
    const { nome, email, senha, numero_t,ddd } = req.body;

    // Verifica se os campos obrigatórios foram fornecidos
    if (!nome || !email || !senha || !numero_t || !ddd) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();

    try {
        // Verificar se o email já está cadastrado
        const [existingUser] = await connection.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Gerar um hash da senha usando bcryptjs
        const hashedPassword = await bcrypt.hash(senha, 10);  // 10 é o "salting rounds", ou número de iterações

        // Iniciar uma transação no banco de dados
        await connection.beginTransaction();

        // Inserir o novo usuário com a senha criptografada
        const [cadastroUser] = await connection.execute(
            'INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedPassword]
        );
        
        const id_usuario = cadastroUser.insertId;  // Captura o ID gerado para o novo usuário

        const [cadastroTelefone] = await connection.execute(
            'INSERT INTO Telefone (numero,ddd, fk_usuario) VALUES (?, ?,?)',
            [numero_t,ddd, id_usuario]
        );

        // Commit da transação
        await connection.commit();

        // Resposta bem-sucedida com ID do usuário
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            id_usuario,
        });
    } catch (error) {
        // Caso haja erro, faz rollback da transação e retorna erro 500
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
        await connection.rollback();
    } finally {
        connection.release();  // Libera a conexão com o banco de dados
    }
};

// Autenticando um usuario
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const [user] = await db.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Email ou senha incorretos' });
        }

        const eCompativel = await bcrypt.compare(senha, user[0].senha);
        if (!eCompativel) {
            return res.status(400).json({ error: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
            { id_usuario: user[0].id_usuario },
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

// Obter todos os usuarios
exports.getUser = async (req, res) => {
    try {
        const [usuarios] = await db.execute('SELECT * FROM Usuario');
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os usuarios' });
    } finally {
        connection.release();
    }
};

// Obter um usuario por ID
exports.getUserID = async (req, res) => {
    const { id } = req.params;
    let connection
    try {
        connection = await db.getConnection();
        const [usuario] = await db.execute('SELECT * FROM Usuario WHERE id_usuario = ?', [id]);
        if (usuario.length > 0) {
            res.status(200).json(usuario[0]);
        } else {
            res.status(404).json({ error: 'Usuario não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter o usuario' });
    } finally {
         connection.release();
    }
};

// Atualizar um usuario
exports.updateUser = async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [userResult] = await connection.execute(
            'UPDATE Usuario SET nome = ?, email = ? WHERE id_usuario = ?',
            [nome, email, id_usuario]
        );

        await connection.commit();

        if (userResult.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuario não encontrado' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuario' });
    } finally {
        connection.release();
    }
};

// Atualizar senha
exports.trocarSenha = async (req, res) => {
    const { id_usuario } = req.user;
    const { senha, novaSenha } = req.body;
    console.log(id_usuario, novaSenha)

    if (!novaSenha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {

        await connection.beginTransaction();

        const [user] = await db.execute('SELECT * FROM Usuario WHERE id_usuario = ?', [id_usuario]);

        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user[0].senha);

        console.log("Senha válida?", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        const hashedPassword = await bcrypt.hash(novaSenha, 10);  // 10 é o "salting rounds", ou número de iterações

        const [userResult] = await connection.execute(
            'UPDATE Usuario SET senha = ? WHERE id_usuario = ?',
            [hashedPassword, id_usuario]
        );

        await connection.commit();

        if (userResult.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario atualizado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuario não encontrado' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuario' });
    } finally {
        connection.release();
    }
};




// Deletar um usuario
exports.deleteUser = async (req, res) => {
    const { id_usuario } = req.user;  // Extrai o ID do usuário do token
    const { senha } = req.body;  // Extrai a senha do corpo da requisição
    console.log("Senha recebida:", senha, id_usuario);

    if (!senha) {
        return res.status(400).json({ error: 'Senha não fornecida' });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [user] = await db.execute('SELECT * FROM Usuario WHERE id_usuario = ?', [id_usuario]);

        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user[0].senha);

        console.log("Senha válida?", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Deletar o usuário
        const [deletarTelefone] = await connection.execute('DELETE FROM Telefone WHERE fk_usuario = ?', [id_usuario]);

        const [deletarUser] = await connection.execute('DELETE FROM Usuario WHERE id_usuario = ?', [id_usuario]);

        await connection.commit();

        if (deletarUser.affectedRows > 0 || deletarTelefone.affectedRows > 0
            ) {
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
    } finally {
        connection.release();
    }
};
