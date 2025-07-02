const jwt = require('jsonwebtoken');

class EstoqueMiddleware {
    static autenticarToken (req, res, next) {
        const authHeader = req.headers['authorization']; // Obtém o token do cabeçalho Authorization
        const token = authHeader && authHeader.split(' ')[1]; // Verifica se o token está presente no cabeçalho
        if (!token) { // Verifica se o token foi fornecido
            return res.status(401).json({ message: 'Token não fornecido.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido.' });
            }
            req.usuario = usuario; // Armazena o usuário decodificado no objeto de requisição
            next();
        });
    }
}

module.exports = EstoqueMiddleware;