import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  
})
export class PerfilComponent implements OnInit {
  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imgTemp:File;
  public imgAux:any = null;
  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private uploadService:UploadService) {
    this.usuario = usuarioService.usuario;
 
    
   }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      apellido:[this.usuario.apellido,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    })
  }

  actualizarPerfil(){
 
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe((resp)=>{
      const {nombre,apellido} = this.perfilForm.value;
      
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      Swal.fire('Exito','datos actualizados','success');
      
    },(err)=>{
      console.log(err);
      
      Swal.fire('error',err.error.error.errors[0].message,'error')
     
    })
  }

  cambiarImagen(file:File){
  this.imgTemp = file;
  if(!file){ return this.imgAux = null}
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = ()=>{
    this.imgAux = reader.result;
    reader.result
  }
    
  }

  subirImagen(){
    this.uploadService.actualizarFoto(this.imgTemp,'usuarios',this.usuario.id).then((img)=>{
      console.log(img);
      
    })
  }
}
