const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { sequelize } = require("./src/config/configDB")
const authRoute = require("./src/module/autenticacao/routes/autenticacao.route")
const usuarioRoute = require("./src/module/usuario/routes/usuario.route")
const estoqueRoute = require("./src/module/estoqueBicicleta/routes/estoque.route")

dotenv.config();

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());

app.use('/api/', estoqueRoute)

app.use('/api/', usuarioRoute)

app.use('/api/',authRoute)


const PORTA = process.env.PORTA


app.listen(PORTA, async () =>{
    try {
        await sequelize.authenticate();
        console.log('conexão com o banco de dados foi estabecida com sucesso')

        await sequelize.sync({ force: true, alter: true});
        console.log("Banco de dados dincronizado com sucesso")
    } catch (error) {
        console.log('erro ao conectar ou sicronizar com o banco de dados', error.message)
    }
    console.log(`Servidor rodando na porta ${PORTA}`)
})