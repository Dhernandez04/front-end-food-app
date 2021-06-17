import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusquedaService } from 'src/app/services/busqueda.service';
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

  id: number;
  nombre: string;
  public desde:number =0;
  public total:number;

  public categoriaForm: FormGroup;
  public actualizarCForm: FormGroup;
  constructor(private categoriaService:CategoriaService,private busquedaService:BusquedaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarCategoria();
    this.categoriaForm = this.fb.group({
      nombre: [, Validators.required],
      activa: [, Validators.required]
    })

    this.actualizarCForm = this.fb.group({
      id: [, ],
      nombre2: [, ]
    })

  }
  listarCategoria(){
    this.categoriaService.cargarCategoria(this.desde,6).subscribe((resp:any) => {  
      this.total = resp.count;  
      this.categorias = resp.categorias;
      this.cargando = true;
   });
  }

  cargarModal(categoria: Categoria) {
    this.id=categoria.id
    this.nombre=categoria.nombre;
  }

  actualizarCambios() {
    
    this.categoriaService.actualizarCategoria(this.id, this.actualizarCForm.value.nombre2)
      .subscribe(resp => {
        Swal.fire('Actualizado', this.actualizarCForm.value.nombre2, 'success');
        this.refresh(); 
      })
    
  }
  buscar(termino:string){
  
    
    if(termino.length === 0 ){
  
      return this.listarCategoria();
    }
    this.busquedaService.buscar('categorias',termino).subscribe((resp:any)=>{
      this.categorias= resp;

    })
    
  }

  eliminarCategoria(categoria: Categoria) {
    this.categoriaService.eliminarCategoria(categoria.id)
      .subscribe(resp => {
        this.listarCategoria();
        Swal.fire('Eliminado', categoria.nombre, 'success');
        
      })
  }
  activarCategoria(categoria: Categoria) {
    this.categoriaService.activarCategoria(categoria.id,true)
      .subscribe((resp:any) => {
        this.listarCategoria();
        Swal.fire('activado', resp.msg, 'success');
        
      })
  }
  cargarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.listarCategoria();
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
