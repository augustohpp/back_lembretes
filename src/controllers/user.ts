import express, {Request, Response} from 'express'
import User from '../classes/User'
const {user} = require('../classes/index')

var usuarios:Array<User> = []

// function lerRegistros(){
//     const registro:any = localStorage.getItem('__Users')
//     return JSON.parse(registro)
// }

// function editarRegistros(obj:object){
//     const dados = JSON.stringify(obj)
//     localStorage.setItem("__Users", dados)
// }

var listar = (req : Request, res : Response) => {
    // var users:Array<User> = usuarios

    if(!usuarios || usuarios.length == 0){
        res.status(400).json('Não há dados')
        return false
    }

    res.status(200).json(usuarios)
}

var criar = (req : Request, res : Response) => {

    const {name, email, password} = req.body
    // var users:Array<User> = usuarios
    
    if(!name || !email || !password){
        res.status(400).send(`É necessário preencher os seguintes campos: ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${!password ? 'age' : ''}`)
        return false
    }

    if(name.length < 3){
        res.status(400).send('Nome inválido')
        return false
    }

    var id = usuarios.length > 0 ? usuarios.length - 1 +1 : 1
    usuarios.push(new user(name,email,password,id))
    // editarRegistros(usuarios)
    res.status(201).json('Usuario adicionado')
}

var info = (req : Request, res : Response) => {
    const {id} = req.params
    // var usuarios:Array<any> = usuarios
    var usuario = usuarios.find(u => u.id == parseInt(id))
    
    if(!usuario){
        res.status(400).json("Usuario não existe")
    }
    res.status(200).json(usuario)
}

var editar = (req : Request, res : Response) => {
    const {name, email, password} = req.body
    const {id} = req.params

    // var usuarios:Array<any> = lerRegistros()
    var i = usuarios.findIndex(u => u.id == parseInt(id))
    
    if(i < 0){
        res.status(400).json("Usuario não existe")
        return false
    }

    if(name && name.length < 3){
        res.status(400).send('Nome inválido')
        return false
    }

    name ? usuarios[i].name = name : ''
    email ? usuarios[i].email = email : ''
    password ? usuarios[i].password = password : ''
    
    // editarRegistros(usuarios)

    res.status(201).json('Usuario editado com sucesso')
}

var deletar = (req : Request, res : Response) => {
    const {id} = req.params

    // var usuarios:Array<any> = lerRegistros()
    var i = usuarios.findIndex(u => u.id === parseInt(id))

    if(i < 0){
        res.status(400).json("Usuario não existe")
        return false
    }

    usuarios.splice(i, 1)
    // editarRegistros(usuarios)
    res.status(201).json('Usuário deletado com sucesso')
}


const usuario = {
    listar,
    criar,
    info,
    editar,
    deletar
}

module.exports = usuario