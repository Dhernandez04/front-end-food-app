import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CalculoService } from '../../services/calculo.service';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';


import { Categoria } from '../../models/categoria.model';
import { Alimento } from '../../models/alimento.model';
import { BusquedaService } from '../../services/busqueda.service';

let conduc=0;
let difu=0;
let densy=0;
let speci=0;
let codigo=0;
@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styles: [
  ]
})
export class CalculosComponent implements OnInit {

  public temperaturaForm: FormGroup;
  public buscarForm: FormGroup;
  public alimentoForm: FormGroup;
  public alimentos: Alimento[] = [];
  public categorias: Categoria[] = [];
  public composicion: any[] = [];
  public cargando: boolean;
  public minerales: any[] = [];
  public vitamina: any[] = [];
  public acidos: any[] = [];
  public estado: boolean = false;

  constructor(private fb: FormBuilder,
    private calculoService: CalculoService,
    private CategoriaService: CategoriaService,
    private alimetoService: AlimentoService,
    private busquedaService:BusquedaService) { }


  
  ngOnInit(): void {
    this.temperaturaForm = this.fb.group({
      temperatura: ['', Validators.required],
    })

    this.buscarForm = this.fb.group({
      cate: [, ],
      alimen: [,]
    })

    this.alimentoForm=this.fb.group({
      alimen: [,]
    })

    this.cargarCategorias();
    
 
  }

  cargarCategorias() {
    this.CategoriaService.cargarCategoria().subscribe((categorias: Categoria[]) => {
    
        this.categorias = categorias;
      })
  }

  cargaralimentos(co: number) {
    console.log(co);
    this.alimetoService.cargarAliCatego(co).subscribe((alimentos: Alimento[])=>{
      this.alimentos= alimentos['alimentoDB'];
    
    })
  }
  
  cargarComposicion() {
   this.cargando = true;
    const id = this.buscarForm.get('alimen').value;
  
    this.busquedaService.cargarComposicion(id).subscribe((resp) => {
      
      this.minerales =resp.composicionDB.minerale
      this.acidos = resp.composicionDB.acidos_graso
      this.vitamina =resp.composicionDB.vitamina
      this.cargando = false;
      this.estado = true;
   
      
    })
  }


  tomarID(){
    console.log(this.buscarForm.value['cate']);
    codigo= this.buscarForm.value['cate'];
    this.cargaralimentos(codigo)
  }


  cargarAlimentos() {
    this.alimetoService.cargarAlimetos().subscribe(resp => {
      console.log(resp);
      this.alimentos = resp;
    })
  }
 

  agregarTem() {
    console.log(this.temperaturaForm.value);
    this.calculoService.hacerCalculo(this.temperaturaForm.value)
      .subscribe(res => {
        //console.log(res['conductivity']);
        conduc = res['conductivity'];
        difu = res['difusivity'];
        densy = res['density'];
        speci = res['specifici'];
        console.log(conduc['component']);
        //console.log(JSON.stringify(res));

      })
  }

  obtenerConductividad() {
    return conduc['component'];
  }

  obtenerDifusivity() {
    return difu['component'];
  }

  obtenerDensity() {
    return densy['component'];
  }

  obtenerSpecifici() {
    return speci['component'];
  }

}
