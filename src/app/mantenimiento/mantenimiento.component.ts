import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Usuario } from '../models/usuario.model';
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
  public usuario:Usuario;
  constructor(private usuarioService:UsuarioService,private renderer: Renderer2) {
    this.usuario = usuarioService.usuario;
    
  }
  ngOnInit(): void {

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
