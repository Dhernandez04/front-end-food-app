import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RolService} from '../../services/rol.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
  ]
})
export class RolesComponent implements OnInit {
public cargando:boolean = false;
public roles:any[];
  constructor(private rolService:RolService) { }

  ngOnInit(): void {
    this.cargarRoles()
  }

  cargarRoles(){
    this.rolService.obtenerRoles().subscribe((resp:any)=>{
    
      this.roles= resp.roles;
      this.cargando= true;
    })
  }

  crearRol(){
    this.abrirSweetAlert();
  }
  eliminarRol(rol:{id:number,nombre:string,activo:string}) {
      
    Swal.fire({
      title: '¿Borrar rol?',
      text: `Esta a punto de borrar a ${rol.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:'Si, borrarlo'
    }).then(result=>{
      if (result.value) {
        this.rolService.eliminarRol(rol).subscribe(resp => {
          Swal.fire('Rol borrado',`${rol.nombre} fue eliminado correctamente`,'success')
          this.cargarRoles();
        })
      
      }
    })
    
  }

  activar(rol){
    this.rolService.activarRol(rol).subscribe((resp:any)=>{
      Swal.fire('Exito', resp.msg, 'success');
      this.cargarRoles();
    })
  }
  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
        title:'Crear rol',
        text:'Ingrese el nombre del nuevo rol',
        input:'text',
        inputPlaceholder: 'Nombre del rol',
        showCancelButton:true
    })
    
    if (value.trim().length>0) {
      this.rolService.crearRol(value).subscribe((resp:any) => {

      this.cargarRoles();
        Swal.fire('Exito', 'Rol creado', 'success');
      })
    }
    
    
  }
}
