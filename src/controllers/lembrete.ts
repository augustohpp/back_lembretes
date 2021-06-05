import express, {Request, Response} from 'express'
import Lembrete from '../classes/Lembretes'

var lembretes:Array<Lembrete> = []

var listar = (req : Request, res : Response) => {
    if(!lembretes || lembretes.length == 0){
        res.json('Não há dados')
        return false
    }

    res.status(200).json(lembretes)
}

var criar = (req : Request, res : Response) => {
    
    const {title, description, completado} = req.body
    
    if(!title || !description){
        res.send(`É necessário preencher os seguintes campos: ${!title ? 'título' : ''} ${!description ? 'Descrição' : ''}`)
        return false
    }

    lembretes.push(new Lembrete(title,description, completado))
    res.status(201).json('Lembrete adicionado')
}

var info = (req : Request, res : Response) => {
    const {id} = req.params

    var lembrete = lembretes.find(u => u.id == parseInt(id))
    
    if(!lembrete){
        res.json("Lembrete não existe")
    }
    res.status(200).json(lembrete)
}

var editar = (req : Request, res : Response) => {
    const {title, description, completado} = req.body
    const {id} = req.params
    
    var i = lembretes.findIndex(u => u.id == parseInt(id))
    
    if(i < 0){
        res.json("Lembrete não existe")
        return false
    }

    if(title && title.length < 3){
        res.send('Título inválido')
        return false
    }

    title ? lembretes[i].title = title : ''
    description ? lembretes[i].description = description : ''
    completado === true || completado === false ? lembretes[i].completado = completado : ''
    
    res.status(201).json('Lembrete editado com sucesso')
}

var deletar = (req : Request, res : Response) => {
    const {id} = req.params

    var i = lembretes.findIndex(u => u.id === parseInt(id))

    if(i < 0){
        res.json("Usuario não existe")
        return false
    }

    lembretes.splice(i, 1)
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