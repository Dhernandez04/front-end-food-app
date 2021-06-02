import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ModalImageService } from '../../services/modal-image.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public cargando: boolean = false;
  public total: number;
  public desde: number = 0;
  public imgSubs: Subscription;
  constructor(private usuarioService:UsuarioService,
    private modalImageService:ModalImageService,
    private busquedaService:BusquedaService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(3000)
    ).subscribe(img=>{
       this.cargarUsuarios()
      })
  }

  cargarUsuarios() {
    this.cargando = false;
    this.usuarioService.obtenerUsuarios(this.desde).subscribe((resp:any) => {
     
      this.total = resp.count; 
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando = true;
    })
  }

  abrirModal(usuario: Usuario) {
   
    this.modalImageService.abrirModal('usuarios', usuario.id, usuario.imagen);
    
  }
  eliminarUsuario(usuario: Usuario) {

    if (usuario.id == this.usuarioService.id) {
      return Swal.fire('Error','No puede borrarse a si mismo', 'error');
    }
      
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:'Si, borrarlo'
    }).then(result=>{
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          Swal.fire('Usuario borrado',`${usuario.nombre} fue eliminado correctamente`,'success')
          this.cargarUsuarios();
        })
      
      }
    })
    
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
  buscar(termino:string){
    if(termino.length ==0 ){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios',termino).subscribe(resultados=>{
      this.usuarios = resultados;
      
    })
    
  }
  cambiarRol(usuario:Usuario){
this.usuarioService.cambiarRol(usuario).subscribe(resp=>{
  console.log(resp);
  
})

  }
}
