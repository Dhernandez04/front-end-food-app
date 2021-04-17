import { Component, Input, OnInit } from '@angular/core';
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
  @Input() nombreAli: String;
  constructor(private alimetoService:AlimentoService) { }

  ngOnInit(): void {
    console.log('hola');
    this.cargarAlimentos()
    

  }

  cargarAlimentos() {
    this.alimetoService.cargarAlimetos().subscribe((resp:any) => {
      console.log(resp);
      this.alimentos = resp.alimentos;
    })
  }

 

}
