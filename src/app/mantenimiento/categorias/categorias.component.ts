import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {
  public categorias: Categoria[] = [];
  cargando :boolean = false;
  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.listarCategoria();
    
  }

  listarCategoria(){
    this.categoriaService.cargarCategoria().subscribe((resp) => {    
      this.categorias = resp;
      this.cargando = true;
   });
  }

  async crearCategoria() {
    const {value=''} = await Swal.fire<string>({
      title:'Crear Categoria',
      text:'Ingrese la nueva categoria',
      input:'text',
      inputPlaceholder: 'Nombre de la categoria',
      showCancelButton:true
  })
  
  if (value.trim().length>0) {
    this.categoriaService.crearCategoria(value).subscribe((resp:any) => {
      this.categorias.push(resp.categotia);
      Swal.fire('Exito', 'Categoria creada', 'success');
    })
  }
  }
  
  actualizarCambios(categoria: Categoria) {
    this.categoriaService.actualizarCategoria(categoria.id, categoria.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', categoria.nombre, 'success');
      })
    
  }
  eliminarCategoria(categoria: Categoria) {
    this.categoriaService.eliminarCategoria(categoria.id)
      .subscribe(resp => {
        this.listarCategoria();
        Swal.fire('Eliminado', categoria.nombre, 'success');
        
      })
  
    
  }
 

}
