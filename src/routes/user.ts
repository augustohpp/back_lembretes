const user = require('../controllers/user')

module.exports = (app:any) => {
    app.get('/users', user.listar)
    app.get('/users/:id', user.info)

    app.post('/users', user.criar)
    app.put('/users/:id', user.editar)
    app.delete('/users/:id', user.deletar)
}