import { Component, OnInit } from '@angular/core';
import { Alimento } from 'src/app/models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ModalImageService } from '../../services/modal-image.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalEditService } from '../../services/modal-edit.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styles: [
  ]
})
export class AlimentosComponent implements OnInit {
  cargando: boolean = false;
  public alimentos: Alimento[] = [];
  public composiciones: any = [];
  public total: number;
  public desde: number = 0;
  constructor(
    private router: Router,
    private alimentoService: AlimentoService,
    private modalImageService: ModalImageService,
    private modalEditService:ModalEditService
  ) { }

  ngOnInit(): void {
    this.cargarAlimentos();
    this.modalImageService.nuevaImagen
    .pipe(
      delay(3000)
    ).subscribe(img=>{
    
       this.cargarAlimentos()
      })

  }
  abrirModal(alimento: Alimento) {
    this.modalImageService.abrirModal('alimentos', alimento.codigo, alimento.imagen);
  }

  cargarAlimentos() {
    this.cargando = false;
    this.alimentoService.cargarAlimetos(this.desde).subscribe((resp: any) => {
      this.total = resp.count;
      this.alimentos = resp.alimentos;
      this.cargando = true;
    })
  }
  cargarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.cargarAlimentos();
  }

  eliminarUsuario(alimento: Alimento) {


    Swal.fire({
      title: '¿Borrar Alimento?',
      text: `Esta a punto de borrar a ${alimento.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then(result => {


    })


  }

  editar(alimento: Alimento) {
    this.modalEditService.abrirModal(alimento.codigo);
    console.log('hola');
    //this.router.navigateByUrl(`dashboard/alimento/${alimento.codigo}`)
  }

}
