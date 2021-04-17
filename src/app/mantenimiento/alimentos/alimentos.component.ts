import { Component, OnInit } from '@angular/core';
import { Alimento } from 'src/app/models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ModalImageService } from '../../services/modal-image.service';
import { CompocisionService } from '../../services/compocision.service';

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
  constructor(private alimentoService: AlimentoService,
    private modalImageService: ModalImageService,
   ) { }

  ngOnInit(): void {
    this.cargarAlimentos();
   
  }
  abrirModal(alimento: Alimento ) {
    this.modalImageService.abrirModal('alimentos', alimento.codigo, alimento.imagen);
  }

  cargarAlimentos() {
    this.cargando = false;
    this.alimentoService.cargarAlimetos(this.desde).subscribe((resp: any ) => {
      this.total = resp.count;
      this.alimentos = resp.alimentos;
      this.cargando = true;
    })
  }
  cargarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde=0
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.cargarAlimentos();
  }

}
