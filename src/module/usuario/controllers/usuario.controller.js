const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

class UsuarioController {
    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha } = req.body;

    // Verifica se o usuário já existe
            const usuarioExistente = await Usuario.findOne({ where: { email } });

            if (usuarioExistente) {
                return res.status(400).json({ message: 'Usuário já existe.ck' });
            }

    // Cria novo usuário
            const novoUsuario = await Usuario.create({
                nome,
                email,
                senha: bcrypt.hashSync(senha, 10) // Criptografa a senha
            });

            return res.status(201).json(novoUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }
}

module.exports = UsuarioController;