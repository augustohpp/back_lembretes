const lembrete = require('../controllers/lembrete')

module.exports = (app:any) => {

    app.get('/lembretes', lembrete.listar)
    app.get('/lembretes/:id', lembrete.info)

    app.post('/lembretes', lembrete.criar)
    app.put('/lembretes/:id', lembrete.editar)
    app.delete('/lembretes/:id', lembrete.deletar)

}