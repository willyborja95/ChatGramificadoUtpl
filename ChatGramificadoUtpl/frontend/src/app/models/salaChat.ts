export class SalaChat {
    _id?: String;
    idChat?: String;
    docente?: String;
    nombreChat?: String;
    nombre?: String;
    numero?: number;
    fecha?: Date;
    chatAlmacenado?: any;

    constructor(_id:string='', docente:string, nombreChat:string='', fecha?:Date){
        this._id = _id;
        this.docente = docente;
        this.nombreChat = nombreChat;
        this.fecha = fecha;
    }
    
}