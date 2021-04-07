import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CalculoService } from '../../services/calculo.service';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';


import { Categoria } from '../../models/categoria.model';
import { Alimento } from '../../models/alimento.model';
import { BusquedaService } from '../../services/busqueda.service';

import { analisis } from '../../interfaces/analisis.interfaces';

let conduc = 0;
let difu = 0;
let densy = 0;
let speci = 0;
let codigo = 0;
let datosCalculo: analisis;
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
  public alimento: Alimento[] = [];
  public categorias: Categoria[] = [];
  public composicion: any[] = [];
  public cargando: boolean;
  public minerales: any[] = [];
  public vitamina: any[] = [];
  public acidos: any[] = [];
  public estado: boolean = false;
  public estado2: boolean = true;



  constructor(private fb: FormBuilder,
    private calculoService: CalculoService,
    private CategoriaService: CategoriaService,
    private alimetoService: AlimentoService,
    private busquedaService: BusquedaService) { }



  ngOnInit(): void {
    this.temperaturaForm = this.fb.group({
      temperatura: ['', Validators.required]
    })

    this.buscarForm = this.fb.group({
      cate: ["",],
      alimen: ["",]
    })

    this.alimentoForm = this.fb.group({
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
    this.alimetoService.cargarAliCatego(co).subscribe((alimentos: Alimento[]) => {
      this.alimentos = alimentos['alimentoDB'];

    })
  }

  cargarComposicion() {
    this.cargando = true;
    const id = this.buscarForm.get('alimen').value;
    this.busquedaService.cargarComposicion(id).subscribe((resp) => {
      this.minerales = resp.composicionDB.minerale
      this.acidos = resp.composicionDB.acidos_graso
      this.vitamina = resp.composicionDB.vitamina
      this.cargando = false;
      this.estado = true;
      this.estado2=false;

      this.cargarAlimento();

    })

  }

  estados() {
    this.estado = false;
    this.estado2=true;
    conduc = 0;
    difu = 0;
    densy = 0;
    speci = 0;
    codigo = 0;
    this.temperaturaForm = this.fb.group({
      temperatura: ['', Validators.required]
    })
  }

  cargarAlimento() {
    const id = this.buscarForm.get('alimen').value;
    this.alimetoService.cargarAlimento(id).subscribe((alimento: Alimento[]) => {
      this.alimento = alimento['alimentoDB'];
      datosCalculo = this.alimento['analisis'];
    })
  }

  tomarID() {
    codigo = this.buscarForm.value['cate'];
    this.cargaralimentos(codigo)
  }



  agregarTem() {
    let t = this.temperaturaForm.value['temperatura'];
    datosCalculo.temperatura = Number(t);
    datosCalculo.hielo = 0;
    this.calculoService.hacerCalculo(datosCalculo)
      .subscribe(res => {
        conduc = res['conductivity'];
        difu = res['difusivity'];
        densy = res['density'];
        speci = res['specifici'];
        console.log(res);
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
