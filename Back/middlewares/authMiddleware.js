const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');


    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_clave_secreta');

        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = authenticateJWT;