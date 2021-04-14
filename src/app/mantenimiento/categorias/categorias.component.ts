import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public categoriaForm: FormGroup;
  constructor(private categoriaService:CategoriaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarCategoria();
    this.categoriaForm = this.fb.group({
      nombre: [, Validators.required],
      activa: [, Validators.required]
    })


  listarCategoria(){
    this.categoriaService.cargarCategoria().subscribe((resp) => {    
      this.categorias = resp;
      this.cargando = true;
   });
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

  agregarCategoria() {
    console.log(this.categoriaForm.value.nombre);
    this.categoriaService.crearCategoria(this.categoriaForm.value)
      .subscribe(res => {
        console.log(res);
      })
     this.refresh(); 
  }
  refresh(): void { window.location.reload(); }
 

}
