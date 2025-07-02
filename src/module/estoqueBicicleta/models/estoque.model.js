const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');




const Estoque = sequelize.define(
    "Estoque",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        produto_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quatidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
     tableName: 'estoque',
     createdAt: 'criado_em',
     updatedAt: 'atualizado_em',
    }
)

module.exports = Estoque;