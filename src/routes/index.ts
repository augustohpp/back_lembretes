import express, {Request, Response} from 'express'


module.exports = (app:any) => {
    app.get('/', (req : Request, res : Response) => {
        res.send('ok')
    })
    //Demais Rotas
    const user = require('./user')(app)
    const transaction = require('./lembrete')(app)

    app.get('*', (req : Request, res : Response) => {
        res.send('Rota não encontrada')
    })
}