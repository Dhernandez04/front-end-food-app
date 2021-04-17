import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  public alimento: Alimento;
  id: number;
  constructor(private alimetoService: AlimentoService,private rutaActiva: ActivatedRoute) { 
    this.id=this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.cargarAlimento();
  }

  cargarAlimento() {
   
    this.alimetoService.cargarAlimento(this.id).subscribe((alimento: Alimento[]) => {
      this.alimento = alimento['alimentoDB'];
      console.log(this.alimento);
    })
  }
  
}
