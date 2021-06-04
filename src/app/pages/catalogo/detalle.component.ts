import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
}) 
export class DetalleComponent implements OnInit {
  public alimento: Alimento;
  id: number;
  constructor(private alimetoService: AlimentoService,private router:Router,private rutaActiva: ActivatedRoute) { 
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

  regresar(){
    const url = this.router.url;
   let  location = url.split('/'); 
    console.log(location);
    if(location[1]==="admin"){
      this.router.navigateByUrl('/admin/alimentos');
    }else if(location[1]=== 'home'){
      
      this.router.navigateByUrl('/home/catalogo');
    }
    
  }
  
}
