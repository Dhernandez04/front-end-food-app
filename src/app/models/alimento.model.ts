
interface analisis{
    id:number;
    humedad: number,
    energiaKcal: number,
    energiaKj: number,
    proteinaG:number,
    lipidosG:number, 
    carbohidratos_total:number,
    carbohidratos_disp:number,
    fibra_dietaria:number,
    cenizas: number
}
export class Alimento {
    constructor(
        public estado:boolean ,
        public nombre:string ,
        public codigo?: number,
        public imagen?:string ,
        public id_img?:string,
        public parte_analizada?:string ,
        public id_categoria?:number,
        public analisis?:analisis,
        public id_usuario?:number
    ){}
}