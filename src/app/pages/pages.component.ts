import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public imagen: string;
  public nombre:string;
  public role:number;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.imagen = this.usuarioService.usuario.imagenUrl;
   this.role = this.usuarioService.role;
    this.nombre=this.usuarioService.usuario.nombre +' '+this.usuarioService.usuario.apellido;
  }
  logout() {
    this.usuarioService.logout()
  }
}
