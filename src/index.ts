import express, {Request, Response} from 'express'

const cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// Rotas
require('./routes/index')(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando na porta 3000')
})