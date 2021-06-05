class User{

    public id : number
    public name : string
    public email : string
    public password : string

    constructor(nome:string,email:string,senha:string,id:number){
        this.id = id
        this.name = nome
        this.email = email
        this.password = senha
    }
}

export default User