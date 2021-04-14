import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public cargando: boolean = false;
  public total: number;
  public desde: number = 0;
  constructor(private usuarioService:UsuarioService,private modalImageService:ModalImageService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = false;
    this.usuarioService.obtenerUsuarios(this.desde).subscribe((resp) => {
    
      this.usuarios = resp;
      this.cargando = true;
    })
  }

  abrirModal(usuario: Usuario) {
   
    this.modalImageService.abrirModal('usuarios', usuario.id, usuario.imagen);
    
    
  }
  cargarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde=0
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
}
