import { Component, OnInit } from '@angular/core';
import { Alimento } from 'src/app/models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styles: [
  ]
})
export class AlimentosComponent implements OnInit {
  public alimentos: Alimento[] = [];
  constructor(private alimentoService:AlimentoService) { }

  ngOnInit(): void {
    this.cargarAlimentos();
  }

  cargarAlimentos() {
    this.alimentoService.cargarAlimetos().subscribe((resp) => {
    
      this.alimentos = resp;
    })
  }

}
