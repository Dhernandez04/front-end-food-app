import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../services/alimento.service';
import { Alimento } from '../../models/alimento.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styles: [
  ]
})
export class CatalogoComponent implements OnInit {
  public alimentos: Alimento[] = [];
  constructor(private alimetoService:AlimentoService) { }

  ngOnInit(): void {
    console.log('hola');
    
    this.cargarAlimentos()

  }

  cargarAlimentos() {
    this.alimetoService.cargarAlimetos().subscribe(resp => {
      console.log(resp);
      this.alimentos = resp;
    })
  }

}
