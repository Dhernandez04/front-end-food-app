import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CalculoService } from '../../services/calculo.service';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';


import { Categoria } from '../../models/categoria.model';
import { Alimento } from '../../models/alimento.model';
import { BusquedaService } from '../../services/busqueda.service';
import { ToastrService } from 'ngx-toastr';

import { DocumentoService } from '../../services/documento.service';
import { Mineral } from '../../models/mineral.model';
import { Vitamina } from '../../models/Vitamina.model';
import { AcidoGraso } from '../../models/AcidoGraso';
import { delay } from 'rxjs/operators';


let conduc = 0;
let difu = 0;
let densy = 0;
let speci = 0;
let codigo = 0;
let datosCalculo: any;
@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: [ './calculo.css']
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
  //arrays para almacenar las composiciones de los alimentos
  public minerales: Mineral[] = [];
  public vitamina: Vitamina[] = [];
  public acidos: AcidoGraso[] = [];
  
  public estado: boolean = false;//variable para mostrar el el div con la informacion del alimento
  public estado2: boolean = true; //variable para mostrar empty state
  public display:boolean = false;
  public statusPdf:boolean = false;
  //variables para almacenar la data y graficar la temperatura respecto a las propiedades termicas
  public tempDifusivity:any[];
  public tempDensity:any[];
  public tempSpecifity:any[];
  public tempConductivity:any[];
 //variables para almacenar la data y graficar la  humedad respecto a las propiedades termicas
  public humDifusivity:any[];
  public humDensity:any[];
  public humSpecifity:any[];
  public humConductivity:any[];

  public statuschart:boolean = false;
   //variables para controlar la visualizacion de las graficas
   public grafica1:boolean=true;
   public grafica2:boolean=false;
  constructor(private fb: FormBuilder,
    private calculoService: CalculoService,
    private CategoriaService: CategoriaService,
    private alimetoService: AlimentoService,
    private busquedaService: BusquedaService,
    private pdf: DocumentoService,
    private toastr: ToastrService) { }



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
  verGrafica1(){
    this.grafica1=true;
    this.grafica2=false;
  }
  verGrafica2(){
    this.grafica2=true;
    this.grafica1=false;

  }
 
  cargarCategorias() {
    this.CategoriaService.cargarCategoria().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    })
  }

  cargaralimentos(co: number) {
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
    })
  }

  tomarID() {
    codigo = this.buscarForm.value['cate'];
    this.cargaralimentos(codigo)
  }


//metodo para calcular las propiedades cuando se ingresa la temperatura
  agregarTem() {
    let t = this.temperaturaForm.value['temperatura'];
    this.display=false;
    datosCalculo.temperatura = Number(t);
    datosCalculo.hielo = 0;
    this.calculoService.hacerCalculo(datosCalculo)
    .pipe(
      delay(500)
    )
      .subscribe(data => {
        //obteniendo la data para graficar las propiedades a la temperatura
        this.tempDifusivity = data['difusivity'].temperatureGraph;
        this.tempDensity = data['density'].temperatureGraph;
        this.tempSpecifity = data['specifici'].temperatureGraph;
        this.tempConductivity = data['conductivity'].temperatureGraph;
        //obteniendo la data para graficar las propiedades con respecto a la humedad
        this.humDifusivity = data['difusivity'].humedityGraph;
        this.humDensity = data['density'].humedityGraph;
        this.humSpecifity = data['specifici'].humedityGraph;
        this.humConductivity = data['conductivity'].humedityGraph;
        
        this.statuschart = true;
        conduc = data['conductivity'];
        difu = data['difusivity'];
        densy = data['density'];
        speci = data['specifici'];
        this.statusPdf = true;
        this.toastr.success('Exito', 'Resultados obtenidos!');
        this.display = true;
      })
  }

  animated(){
    console.log('aminando');
    
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
    let propiedades = [
      this.obtenerConductividad(),
      this.obtenerDifusivity(),
      this.obtenerSpecifici(),
      this.obtenerDensity()];
    this.pdf.generarPdf(propiedades,this.alimento['nombre'],this.alimento['categoria'].nombre,data,this.minerales, this.acidos, this.vitamina, this.temperaturaForm.value['temperatura'] );
  }
  //'Humedad(g)','Energia(kcal)','Energia(kj)','Proteina(g)','Proteina(g)','lipidos(g)','carbohidrato totales(g)','carbohidratos disponibles(g)','fibra dietaria(g)','cenizas(g)'
}
