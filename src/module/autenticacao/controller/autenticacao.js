const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const Estoque = require('../../../module/estoqueBicicleta/models/estoque.model');
 

// Definindo variaveis de ambiente para TEMPO_ACESS_TOKEN e TEMPO_REFRESH_TOKEN
const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN;
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN;

class EstoqueController {
    // gerando o token
    static gerarToken(usuario) {
        return jwt.sign(usuario, process.env.SECRET_KEY, {
            expiresIn: tempo_acess_token,
        });
    }
    static async gerarREfreshToken(usuario) {
        return jwt.sign(usuario, process.env.SECRET_KEY, {
            expiresIn: tempo_refresh_token,
        });
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if(!email || !senha) {
                return res.status(400).json({ message: 'È necessario informar email e senha para login' });
            }
            const usuario = await Estoque.findOne({ where: { email } });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: 'Email ou Senha inválida.' });
            }
            const dadosUsuario = {
                id: usuario.id,
                email: usuario.email,
                };

         const tokenAcess = EstoqueController.gerarToken(dadosUsuario);
         const refreshToken =EstoqueController.gerarREfreshToken(dadosUsuario);

         res.cookie('refreshToken', refreshToken, {
             httpOnly: false, // Defina como true se quiser que o cookie seja acessível apenas pelo servidor
             secure: process.env.NODE_ENV === 'production',
             maxAge:1 * 24, // 1 dia
         });
         res.status(200).json({
             message: 'Login realizado com sucesso.',
             tokenAcess,
             nome: usuario.nome,
             papel: "usuario",
         });
        } catch (error) {
            res.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message,
            });
        }
    }
    static refereshToken(req, res){
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token invalido.' });
        }
        jwt.verify(refreshToken,
            process.env.JWT_REFRESH_SECRET,
            (erro, Usuario) => {
                if(erro){
                    return res.status(403).json({ message: 'Refresh token invalido.' });
                }
                const dadosUsuario = {
                    id: Usuario.id,
                    email: Usuario.email,
                };
                const novoAccessToken = EstoqueController.gerarToken(dadosUsuario);
                res.status(200).json({ tokenAcess:novoAccessToken });
            }
        )
    }
    static async sair(req, res) {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true, // Defina como true se quiser que o cookie seja acessível apenas pelo servidor
                secure: process.env.NODE_ENV === 'development',
                samaSite: "strict",
            });
            res.status(200).json({msg:"logout realizado com sucesso"})
        } catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor. Por favor, tente mais tarde",
                erro:error.message,
            })
        }
    }
}

module.exports = EstoqueController