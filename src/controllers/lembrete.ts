import express, {Request, Response} from 'express'
import Lembrete from '../classes/Lembretes'

var lembretes:Array<Lembrete> = []

// function lerRegistros(){
//     const registro:any = localStorage.getItem('__Recados')
//     return JSON.parse(registro)
// }

// function editarRegistros(obj:object){
//     const dados = JSON.stringify(obj)
//     localStorage.setItem("__Recados", dados)
// }

var listar = (req : Request, res : Response) => {
    if(!lembretes || lembretes.length == 0){
        res.status(400).json('Não há dados')
        return false
    }

    res.status(200).json(lembretes)
}

var criar = (req : Request, res : Response) => {
    
    const {title, description} = req.body
    // var users:Array<User> = usuarios
    
    if(!title || !description){
        res.status(400).send(`É necessário preencher os seguintes campos: ${!title ? 'título' : ''} ${!description ? 'Descrição' : ''}`)
        return false
    }

    // var id = lembretes.length > 0 ? lembretes.length - 1 +1 : 1
    lembretes.push(new Lembrete(title,description))
    // editarRegistros(usuarios)
    res.status(201).json('Lembrete adicionado')
}

var info = (req : Request, res : Response) => {
    const {id} = req.params
    // var usuarios:Array<any> = usuarios
    var lembrete = lembretes.find(u => u.id == parseInt(id))
    
    if(!lembrete){
        res.status(400).json("Lembrete não existe")
    }
    res.status(200).json(lembrete)
}

var editar = (req : Request, res : Response) => {
    const {title, description} = req.body
    const {id} = req.params

    // var usuarios:Array<any> = lerRegistros()
    var i = lembretes.findIndex(u => u.id == parseInt(id))
    
    if(i < 0){
        res.status(400).json("Lembrete não existe")
        return false
    }

    if(title && title.length < 3){
        res.status(400).send('Título inválido')
        return false
    }

    title ? lembretes[i].title = title : ''
    description ? lembretes[i].description = description : ''
    
    // editarRegistros(usuarios)

    res.status(201).json('Lembrete editado com sucesso')
}

var deletar = (req : Request, res : Response) => {
    const {id} = req.params

    // var usuarios:Array<any> = lerRegistros()
    var i = lembretes.findIndex(u => u.id === parseInt(id))

    if(i < 0){
        res.status(400).json("Usuario não existe")
        return false
    }

    lembretes.splice(i, 1)
    // editarRegistros(usuarios)
    res.status(201).json('Lmebrete deletado com sucesso')
}

const transacao = {
    listar,
    criar,
    info,
    editar,
    deletar
}

module.exports = transacao