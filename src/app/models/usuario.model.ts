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
            return 'https://res.cloudinary.com/dptovaszm/image/upload/v1617992659/istockphoto-922962354-612x612_1_z9zsxu.jpg';
        }
    }
}