class Lembrete{
    // title, value e type.
    public id : number
    public title : string
    public description : string

    constructor(titulo:string, description:string,){
        this.id = Math.floor(Math.random() * 1000 + 52 + 60 +569)
        this.title = titulo
        this.description = description
    }
}

export default Lembrete