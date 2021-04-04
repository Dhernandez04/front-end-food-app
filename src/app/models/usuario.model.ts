export class Usuario {
    constructor(
       public nombre:string,
        public apellido:string,
        public email: string,
        public id_rol: number,
        public activo: boolean,
        public password?:string,
       public imagen?:string,
        public id?:string,
    ){}


    get imagenUrl(){
        if(this.imagen){
            return this.imagen;
        } else {
            return '';
        }
    }
}