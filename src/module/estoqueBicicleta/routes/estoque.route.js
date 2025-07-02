const express = require('express');
const EstoqueController = require('../controllers/estoque.controller');
const router = express.Router();
const EstoqueMiddleware = require('../middleware/estoque.middleware');



// Rota para criar um novo produto no estoque
  router.post('/estoque', EstoqueController.criarEstoque);
// Rota para listar todos os produtos no estoque
  router.get('/estoque', EstoqueController.listarEstoque);
// Rota para listar um produto específico por ID
  router.get('/estoque/:id', EstoqueController.listarEstoquePorId);
// Rota para atualizar um produto específico por ID
  router.put('/estoque/:id', EstoqueController.atualizarEstoquePorId);
// Rota para excluir um produto específico por ID
  router.delete('/estoque/:id', EstoqueController.deletarEstoquePorId);

module.exports = router;