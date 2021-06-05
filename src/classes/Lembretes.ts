class Lembrete{
    public id : number
    public title : string
    public description : string
    public completado : boolean

    constructor(titulo:string, description:string, completado: boolean){
        this.id = Math.floor(Math.random() * 1000 + 52 + 60 +569)
        this.title = titulo
        this.description = description
        this.completado = completado
    }
}

export default Lembrete