export class GlosarioTermino {
  _id?: String;
  chat: String;
  termino?: any;
  descripcion: String;
  
  constructor(_id: String, termino: String, descripcion: String){
    this._id = _id;
    this.termino = termino;
    this.descripcion = descripcion;
  }

}
