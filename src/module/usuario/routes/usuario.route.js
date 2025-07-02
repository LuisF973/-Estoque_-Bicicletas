const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');
const router = express.Router();
const UsuarioMiddleware = require('../middleware/usuario.middleware');



// Rota para criar um novo usuário
router.post('/usuario', UsuarioController.criarUsuario);
// Rota para listar todos os usuários
router.get('/usuario', UsuarioMiddleware.autenticarToken, UsuarioController.listarUsuarios);