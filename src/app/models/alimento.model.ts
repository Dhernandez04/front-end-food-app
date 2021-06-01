

export class Alimento {
    constructor(
        public estado:boolean ,
        public nombre:string ,
        public humedad: number,
        public energiaKcal: number,
        public energiaKj: number,
        public carbohidratos_total:number,
        public carbohidratos_disp:number,
        public proteinaG:number,
        public lipidosG:number, 
        public fibra_dietaria:number,
        public cenizas: number,
        public codigo?: number,
        public imagen?:string ,
        public id_img?:string,
        public parte_analizada?:string ,
        public id_categoria?:number,
        public id_usuario?:number
    ) { }
    
    get imagenUrl(){
        if(this.imagen){
            return this.imagen;
        } else {
            return 'https://res.cloudinary.com/dptovaszm/image/upload/v1617992659/istockphoto-922962354-612x612_1_z9zsxu.jpg';
        }
    }
}