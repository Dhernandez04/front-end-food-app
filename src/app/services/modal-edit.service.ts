import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEditService {

  constructor() { }
  public id: number;
  private _ocultarModal: boolean = true;


  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(codigo:number) {
    this._ocultarModal = false;
    this.id = codigo;
    console.log('modal abierto');

  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}


