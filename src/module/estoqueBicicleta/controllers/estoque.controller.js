const Estoque = require('../models/estoque.model');
const bcrypt = require('bcrypt');


class EstoqueController {
    static async criarEstoque(req, res) {
        try {
            const { produto_nome, marca, categoria, quatidade, preco } = req.body;
    // Verifica se o produto já existe
            const produtoExistente = await Estoque.findOne({ where: { produto_nome } });

            if (produtoExistente) {
                return res.status(400).json({ message: 'Produto já existe no estoque.' });
            }
   // Cria novo produto no estoque
            const novoProduto = await Estoque.create({
                produto_nome,
                marca,
                categoria,
                quatidade,
                preco
            });

            return res.status(201).json(novoProduto);
            
        } catch (error) {
            console.error('Erro ao criar estoque:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
            
        }
    }
    static async listarEstoque(req, res) {
        try {
            const produtos = await Estoque.findAll();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar estoque:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }
    static async listarEstoquePorId(req, res) {
        const { id } = req.params;
        try {
            const produto = await Estoque.findByPk(id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            return res.status(200).json(produto);
        } catch (error) {
            console.error('Erro ao listar estoque por ID:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }

    static async atualizarEstoquePorId(req, res) {
    // obtém o ID do produto a ser atualizado
        const { id } = req.params; 
    // Obtém os novos dados do produto a partir do corpo da requisição
        const { produto_nome, marca, categoria, quatidade, preco } = req.body;

        try {
            const produto = await Estoque.findByPk(id);
    // Verifica se o produto existe
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

    // Atualiza os campos do produto
            produto.produto_nome = produto_nome || produto.produto_nome;
            produto.marca = marca || produto.marca;
            produto.categoria = categoria || produto.categoria;
            produto.quatidade = quatidade || produto.quatidade;
            produto.preco = preco || produto.preco;

            await produto.save();

            return res.status(200).json(produto);
        } catch (error) {
            console.error('Erro ao atualizar estoque:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }
    static async deletarEstoquePorId(req, res) {
        const { id } = req.params;

        try {
    // busca o produto pelo ID
            const produto = await Estoque.findByPk(id); 
    // verifica se o produto existe 
            if (!produto) { 
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
    // deleta o produto do estoque
            await produto.destroy(); 
            return res.status(200).json({ message: 'Produto deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar estoque:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }
}

module.exports = EstoqueController;