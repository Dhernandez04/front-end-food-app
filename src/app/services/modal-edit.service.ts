import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEditService {

  constructor() { }
  public id: number;
  private _ocultarModal: boolean = true;
  public aminoacido:boolean=false;
  public azucar:boolean=false;

  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(codigo:number,aminoacido?:boolean,azucar?:boolean) {
    this._ocultarModal = false;
    this.azucar=azucar;
    this.aminoacido= aminoacido;
    this.id = codigo;
    console.log(aminoacido);

  }
  obtenerEstadoAminoacido(){
    return this.aminoacido;

  }
  obtenerEstadoAzucar(){
    return this.azucar;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
}


