import express, {Request, Response} from 'express'
import User from '../classes/User'
const {user} = require('../classes/index')

var usuarios:Array<User> = []

var listar = (req : Request, res : Response) => {
    
    if(!usuarios || usuarios.length == 0){
        res.json('Não há dados')
        return false
    }

    res.status(200).json(usuarios)
}

var criar = (req : Request, res : Response) => {

    const {name, email, password} = req.body
    
    if(!name || !email || !password){
        res.send(`É necessário preencher os seguintes campos: ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${!password ? 'age' : ''}`)
        return false
    }

    if(name.length < 3){
        res.send('Nome inválido')
        return false
    }

    var id = usuarios.length > 0 ? usuarios.length - 1 +1 : 1
    usuarios.push(new user(name,email,password,id))
    res.status(201).json('Usuario adicionado')
}

var info = (req : Request, res : Response) => {
    const {id} = req.params
    var usuario = usuarios.find(u => u.id == parseInt(id))
    
    if(!usuario){
        res.json("Usuario não existe")
    }
    res.status(200).json(usuario)
}

var editar = (req : Request, res : Response) => {
    const {name, email, password} = req.body
    const {id} = req.params

    var i = usuarios.findIndex(u => u.id == parseInt(id))
    
    if(i < 0){
        res.json("Usuario não existe")
        return false
    }

    if(name && name.length < 3){
        res.send('Nome inválido')
        return false
    }

    name ? usuarios[i].name = name : ''
    email ? usuarios[i].email = email : ''
    password ? usuarios[i].password = password : ''
    
    res.status(201).json('Usuario editado com sucesso')
}

var deletar = (req : Request, res : Response) => {
    const {id} = req.params

    var i = usuarios.findIndex(u => u.id === parseInt(id))

    if(i < 0){
        res.json("Usuario não existe")
        return false
    }

    usuarios.splice(i, 1)
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