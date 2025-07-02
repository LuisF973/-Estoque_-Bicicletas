const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/config/configDB');

// Importações dos módulos
const UsuarioMiddleware = require('./src/module/usuario/middleware/usuario.middleware');
const usuarioRoutes = require('./src/module/usuario/routes/usuario.route'); 
const estoqueRoutes = require('./src/module/estoqueBicicleta/routes/estoque.route');

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();

// Configuração do CORS para permitir requisições do front-end
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); // Para tratar JSON nas requisições

// ROTAS PÚBLICAS
app.use('/api', usuarioRoutes); // Login, cadastro, etc

//  MIDDLEWARE DE AUTENTICAÇÃO
// Tudo abaixo disso exige token JWT válido
app.use(UsuarioMiddleware.autenticarToken);

//  ROTAS PROTEGIDAS
app.use('/api/estoque', estoqueRoutes);

//  SUBIDA DO SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});
