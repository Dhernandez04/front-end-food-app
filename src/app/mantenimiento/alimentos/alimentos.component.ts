import { Component, OnInit } from '@angular/core';
import { Alimento } from 'src/app/models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styles: [
  ]
})
export class AlimentosComponent implements OnInit {
  cargando: boolean = false;
  public alimentos: Alimento[] = [];
  constructor(private alimentoService:AlimentoService,private modalImageService:ModalImageService) { }

  ngOnInit(): void {
    this.cargarAlimentos();
  }
  abrirModal(alimento: Alimento ) {
   
    this.modalImageService.abrirModal('alimentos', alimento.codigo, alimento.imagen);
    
    
  }

  cargarAlimentos() {
    this.alimentoService.cargarAlimetos().subscribe((resp) => {
    
      this.alimentos = resp;
      this.cargando = true;
    })
  }

}
