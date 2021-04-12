import { EventEmitter,Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  constructor() { }
  public tipo:'usuarios'|'alimentos';
  public id:string|number;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  
  private _ocultarModal: boolean = true;
  
  get ocultarModal(){
    return this._ocultarModal;
  }
  abrirModal(tipo:'usuarios'|'alimentos',id:string|number,img:string='https://res.cloudinary.com/dptovaszm/image/upload/v1617992659/istockphoto-922962354-612x612_1_z9zsxu.jpg') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')  || img === null){

      this.img = img;
    } 

  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
