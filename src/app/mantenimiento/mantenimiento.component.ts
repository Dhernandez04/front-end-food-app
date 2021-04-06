import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styles: [
  ]
})
export class MantenimientoComponent implements OnInit {
  @ViewChild("wrapper") wrapper: ElementRef;
  public click: boolean = false;
  public imagen: string;
  public nombre:string;
  constructor(private usuarioService:UsuarioService,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.imagen = this.usuarioService.usuario.imagenUrl;
    this.nombre=this.usuarioService.usuario.nombre +' '+this.usuarioService.usuario.apellido;
  }

  open() {
    if (this.click) {
      this.renderer.addClass(this.wrapper.nativeElement, "toggled");
      this.click = false;
    } else {
      this.renderer.removeClass(this.wrapper.nativeElement, "toggled");
      this.click = true;
    }
   
 }
  logout() {
    this.usuarioService.logout()
  }
}
