import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CalculoService } from '../../services/calculo.service';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';


import { Categoria } from '../../models/categoria.model';
import { Alimento } from '../../models/alimento.model';
import { BusquedaService } from '../../services/busqueda.service';

import { analisis } from '../../interfaces/analisis.interfaces';
import { DocumentoService } from '../../services/documento.service';
import { Mineral } from '../../models/mineral.model';
import { Vitamina } from '../../models/Vitamina.model';
import { AcidoGraso } from '../../models/AcidoGraso';
import Swal from 'sweetalert2';

let conduc = 0;
let difu = 0;
let densy = 0;
let speci = 0;
let codigo = 0;
let datosCalculo: any;
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
  public minerales: Mineral[] = [];
  public vitamina: Vitamina[] = [];
  public acidos: AcidoGraso[] = [];
  
  public estado: boolean = false;
  public estado2: boolean = true;
  public analisis: any;
  public statusPdf:boolean = false;


  constructor(private fb: FormBuilder,
    private calculoService: CalculoService,
    private CategoriaService: CategoriaService,
    private alimetoService: AlimentoService,
    private busquedaService: BusquedaService,
    private pdf: DocumentoService) { }



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
      console.log(resp)
      this.minerales = resp.composicionDB.minerale
      this.acidos = resp.composicionDB.acidos_graso
      this.vitamina = resp.composicionDB.vitamina
      this.cargando = false;
      this.estado = true;
      this.estado2 = false;
      this.cargarAlimento();

    })

  }
  estados() {
    this.estado = false;
    this.estado2 = true;
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
    console.log(this.buscarForm.get('alimen'));
    
    const id = this.buscarForm.get('alimen').value;
    this.alimetoService.cargarAlimento(id).subscribe((alimento: Alimento[]) => {
      this.alimento = alimento['alimentoDB'];
     
   
      datosCalculo =   {
        humedad: alimento['alimentoDB'].humedad,
        energiaKcal: alimento['alimentoDB'].energiaKcal,
        energiaKj: alimento['alimentoDB'].energiaKj,
        proteinaG:alimento['alimentoDB'].proteinaG,
        lipidosG:alimento['alimentoDB'].lipidosG, 
        carbohidratos_total:alimento['alimentoDB'].carbohidratos_total,
        carbohidratos_disp:alimento['alimentoDB'].carbohidratos_disp,
        fibra_dietaria:alimento['alimentoDB'].fibra_dietaria,
        cenizas: alimento['alimentoDB'].cenizas,
     
      };
    ;
    })
  }

  tomarID() {
    codigo = this.buscarForm.value['cate'];
    this.cargaralimentos(codigo)
  }



  agregarTem() {
    let t = this.temperaturaForm.value['temperatura'];
    console.log(t);
    datosCalculo.temperatura = Number(t);
    datosCalculo.hielo = 0;
    this.calculoService.hacerCalculo(datosCalculo)
      .subscribe(res => {
        conduc = res['conductivity'];
        difu = res['difusivity'];
        densy = res['density'];
        speci = res['specifici'];
        this.statusPdf = true
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Resultados obtenidos satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
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

  //generando pdf
  generarPdf() {
    let data = [datosCalculo];
    let propiedades = [this.obtenerConductividad(),
      this.obtenerDifusivity(),
      this.obtenerSpecifici(),
      this.obtenerDensity()];

    console.log("propiedades",propiedades);
    
    this.pdf.generarPdf(propiedades,this.alimento['nombre'],this.alimento['categoria'].nombre,data,this.minerales, this.acidos, this.vitamina);
  }
  //'Humedad(g)','Energia(kcal)','Energia(kj)','Proteina(g)','Proteina(g)','lipidos(g)','carbohidrato totales(g)','carbohidratos disponibles(g)','fibra dietaria(g)','cenizas(g)'
}
