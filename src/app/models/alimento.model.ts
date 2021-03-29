

export class Alimento {
    constructor(
        public estado:boolean ,
        public nombre:string ,
        public codigo?: number,
        public imagen?:string ,
        public id_img?:string,
        public parte_analizada?:string ,
        public id_categoria?:number,
        public id_aproximal?:number,
        public id_usuario?:number
    ){}
}