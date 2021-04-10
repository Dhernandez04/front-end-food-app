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
  constructor(private usuarioService:UsuarioService,private modalImageService:ModalImageService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((resp) => {
      console.log(resp);
      this.usuarios = resp;
    })
  }

  abrirModal(usuario: Usuario) {
    this.modalImageService.abrirModal('usuarios', usuario.id, usuario.imagen);
    console.log(usuario);
    
  }
}
