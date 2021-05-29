import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { forkJoin, of, timer } from 'rxjs';

import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';
import { MineralService } from '../../services/mineral.service';
import { VitaminaService } from '../../services/vitamina.service';
import { AcidograsoService } from '../../services/acidograso.service';
import { CompocisionService } from '../../services/compocision.service';
import { Compocision } from '../../models/Compocision';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AminoacidoService } from 'src/app/services/aminoacido.service';


@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})

export class AlimentoComponent implements OnInit {
  step: any = 1;
  formaAlimento: FormGroup; //formulario de alimentos

  composicionSelecionanda: any;

  public categorias: Categoria[] = [];

  idRes: number;
  idMin: number;
  idVit: number;
  idAci: number;
  composi: Compocision;
  // variable para abrir los formulario de aminoacidos y azucares
  ctrlAminoacido:boolean = false;
  ctrlAzucar:boolean = false;

  //variables para ocultar formulario de acidos grasos cuando se editan los aminoacidos o aucares
  crtlEdit=false;
  

  constructor(

    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private alimentoService: AlimentoService,
    private mineralService: MineralService,
    private acidograsoService: AcidograsoService,
    private vitaminaService: VitaminaService,
    private aminoacidoService:AminoacidoService,
    private compocisionService: CompocisionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    public id: string;
    public tipo:string;
  ngOnInit(): void {
    this.crearForm();
    this.traerCategorias();
    this.activatedRoute.params.subscribe(({ id, tipo }) => {
      this.id = id;
      this.tipo = tipo;
      this.cargarStep(tipo);
      this.cargarcomposicionPorId(id);
      
    })

  }
// cargando la composicion del alimento
  cargarcomposicionPorId(id: number) {
    this.compocisionService.ComposicionById(id).subscribe((resp:any) => {
      this.composicionSelecionanda = resp;
      this.formaAlimento.setValue({
        id_categoria:resp.composicionDB.alimento.id_categoria,
        nombre:resp.composicionDB.alimento.nombre,
        parte_analizada:resp.composicionDB.alimento.parte_analizada ,
        humedad: resp.composicionDB.alimento.humedad ,
        energiaKcal:resp.composicionDB.alimento.energiaKcal,
        energiaKj:resp.composicionDB.alimento.energiaKj,
        proteinaG: resp.composicionDB.alimento.proteinaG,
        lipidosG: resp.composicionDB.alimento.lipidosG,
        carbohidratos_total:resp.composicionDB.alimento.carbohidratos_total,
        carbohidratos_disp:resp.composicionDB.alimento.carbohidratos_disp ,
        fibra_dietaria:resp.composicionDB.alimento.fibra_dietaria ,
        cenizas: resp.composicionDB.alimento.cenizas,
        calcio:resp.composicionDB.minerale.calcio ,
        hierro:resp.composicionDB.minerale.hierro ,
        sodio:resp.composicionDB.minerale.sodio ,
        fosforo:resp.composicionDB.minerale.fosforo ,
        yodo: resp.composicionDB.minerale.yodo,
        zinc: resp.composicionDB.minerale.zinc,
        magnecio:resp.composicionDB.minerale.magnecio,
        potasio: resp.composicionDB.minerale.potasio,
        tiamina: resp.composicionDB.vitamina.tiamina,
        riboflaxina: resp.composicionDB.vitamina.riboflaxina,
        niaxina: resp.composicionDB.vitamina.niaxina,
        folatos: resp.composicionDB.vitamina.folatos,
        vitaminaA: resp.composicionDB.vitamina.vitaminaA,
        vitaminaC: resp.composicionDB.vitamina.vitaminaC,
        vitamina_b12: resp.composicionDB.vitamina.vitamina_b12,
        grasaSaturada: resp.composicionDB.acidos_graso.grasaSaturada,
        grasaMenosSaturada: resp.composicionDB.acidos_graso.grasaMenosSaturada,
        grasaPoliinsaturada: resp.composicionDB.acidos_graso.grasaPoliinsaturada,
        colesterol: resp.composicionDB.acidos_graso.colesterol,
        parteComestible: resp.composicionDB.acidos_graso.parteComestible,
       //aminoacido
        acido_aspartico:1,
        treonina:1,
        serina:1,
        acido_glutaminico:1,
        prolina:1,
        glicina:1,
        alanina:1,
        cisteina:1,
        valina:1,
        metionina:1,
        isoleucina:1,
        leucina:1,
        tirosina:1,
        fenilalanina:1,
        histidina:1,
        lisina:1,
        arginina:1,
        triptofano:1
      })
    })
  }
//control del formulario
  cargarStep(tipo) {
    if (tipo === 'mineral') {
      this.step = 2;
    } else if (tipo === 'acidograso' ) {
      this.step = 4;
    } else if (tipo === 'vitamina') {
      this.step=3
    } else if(tipo === 'azucar' ) {
      this.step=4;
      this.ctrlAzucar = true;
      this.crtlEdit = true;
    } else if(tipo == 'aminoacido' ) {
      this.step=4;
      this.ctrlAminoacido = true;
      this.crtlEdit=true;

      console.log(this.crtlEdit);
      
    }else{
        this.step = 1;
    }
  }
//validaciones 
  get nombreInvalid() {
    return this.formaAlimento.get('nombre').invalid && this.formaAlimento.get('nombre').touched;
  }

  get humedadInvalid() {
    return this.formaAlimento.get('humedad').invalid && this.formaAlimento.get('humedad').touched;
  }

  get energiakcInvalid() {
    return this.formaAlimento.get('energiaKcal').invalid && this.formaAlimento.get('energiaKcal').touched;
  }

  get energiakInvalid() {
    return this.formaAlimento.get('energiaKj').invalid && this.formaAlimento.get('energiaKj').touched;
  }

  get proteinaInvalid() {
    return this.formaAlimento.get('proteinaG').invalid && this.formaAlimento.get('proteinaG').touched;
  }

  get lipidosInvalid() {
    return this.formaAlimento.get('lipidosG').invalid && this.formaAlimento.get('lipidosG').touched;
  }

  get carb1Invalid() {
    return this.formaAlimento.get('carbohidratos_total').invalid && this.formaAlimento.get('carbohidratos_total').touched;
  }

  get carb2Invalid() {
    return this.formaAlimento.get('carbohidratos_disp').invalid && this.formaAlimento.get('carbohidratos_disp').touched;
  }

  get fibraInvalid() {
    return this.formaAlimento.get('fibra_dietaria').invalid && this.formaAlimento.get('fibra_dietaria').touched;
  }

  get cenizaInvalid() {
    return this.formaAlimento.get('cenizas').invalid && this.formaAlimento.get('cenizas').touched;
  }
//metodos para controlar el formulario
  siguiente() {
    if (this.step < 5) {
      this.step = this.step + 1;
    }
  }
  previus() {
    if (this.step > 0 && this.step <= 5) {

      this.step = this.step - 1;
    }
  }
//metodo para agregar composicion
  agregar() {  
    if(this.id !== 'nuevo'){
     
       switch (this.tipo) {
         case 'alimento':
           this.alimentoService.actualizarAlimento(this.id,this.formaAlimento.value).subscribe((resp:any)=>{
             console.log(resp);
             Swal.fire('success', `${resp.mgs}`, 'success');
             this.router.navigateByUrl('/dashboard/alimentos')
           })      
           break;
           case 'vitamina':
           this.vitaminaService.actualizarVitamina(this.id,this.formaAlimento.value).subscribe((resp:any)=>{

          
             Swal.fire('success', `${resp.mgs}`, 'success');
             this.router.navigateByUrl('/dashboard/alimentos')
           })
           break;
           case'mineral':
           this.mineralService.actualizarMineral(this.id,this.formaAlimento.value).subscribe((resp:any)=>{
            
             Swal.fire('success', `${resp.mgs}`, 'success');
             this.router.navigateByUrl('/dashboard/alimentos')
           })

           case'acidograso':
           this.acidograsoService.actualiarAcido(this.id,this.formaAlimento.value).subscribe((resp:any)=>{
            Swal.fire('success', `${resp.mgs}`, 'success');
            this.router.navigateByUrl('/dashboard/alimentos')
           })
        
           break;

           
         default:
           break;
       }
    }else{
      console.log(this.formaAlimento.value);
       this.alimentoService.crearAlimento(this.formaAlimento.value).subscribe((res: any) => {
      this.idRes = res.alimento.codigo;
      
      const observable = forkJoin({
        obs1: this.agregarMineral(),
        obs2: this.agregarAcido(),
        obs3: this.agregarVitamina(),
       
      });
      observable.subscribe((value: any) => {
        this.idMin = value.obs1.mineral.codigom;
        this.idAci = value.obs2.acido_graso.codigoa;
        this.idVit = value.obs3.vitamina.codigov;
        this.composi = {
          id_minerales: this.idMin,
          id_vitaminas: this.idVit,
          id_acidosGrasos: this.idAci,
          cod_alimento: this.idRes,
          estado: "Aprobado",
        };

       
        //se manda el id del alimento si tiene aminoacido
        if(this.ctrlAminoacido){
          this.agregarAminoacido(this.idRes);
          this.agregarComposicion(this.composi);
          this.router.navigateByUrl('/admin/alimentos')
        }else{
          this.agregarComposicion(this.composi);
          this.router.navigateByUrl('/admin/alimentos')
        }
      });
      });
    }
       
  }
//implementando los servicios
  agregarMineral() {
    return this.mineralService.crearMineral(this.formaAlimento.value)
  }

  agregarAcido() {
    return this.acidograsoService.crearAcido(this.formaAlimento.value)
  }

  agregarVitamina() {
    return this.vitaminaService.crearVitamina(this.formaAlimento.value);
  }

  agregarAminoacido(id){

    return this.aminoacidoService.crearAminoacido(this.formaAlimento.value,id).subscribe((res:any)=>{
      console.log(res);
      
    });

  }

  agregarComposicion(compocision) {
    this.compocisionService.crearComposiciones(compocision).subscribe((res: any) => {
    
      Swal.fire('success', 'Alimento agregado', 'success')
    })
  }
  //metodo para crear los formularios
  crearForm() {
    this.formaAlimento = this.fb.group({
      id_categoria: [1, Validators.required],
      nombre: [1, Validators.required],
      parte_analizada: [1, Validators.required],
      humedad: [1, Validators.required],
      energiaKcal: [1, Validators.required],
      energiaKj: [1, Validators.required],
      proteinaG: [1, Validators.required],
      lipidosG: [1, Validators.required],
      carbohidratos_total: [1, Validators.required],
      carbohidratos_disp: [1, Validators.required],
      fibra_dietaria: [1, Validators.required],
      cenizas: [1, Validators.required],
      calcio: [1, Validators.required],
      hierro: [1, Validators.required],
      sodio: [1, Validators.required],
      fosforo: [1, Validators.required],
      yodo: [1, Validators.required],
      zinc: [1, Validators.required],
      magnecio: [1, Validators.required],
      potasio: [1, Validators.required],
      tiamina: [1, Validators.required],
      riboflaxina: [1, Validators.required],
      niaxina: [1, Validators.required],
      folatos: [1, Validators.required],
      vitaminaA: [1, Validators.required],
      vitaminaC: [1, Validators.required],
      vitamina_b12: [1, Validators.required],
      grasaSaturada: [1, Validators.required],
      grasaMenosSaturada: [1, Validators.required],
      grasaPoliinsaturada: [1, Validators.required],
      colesterol: [1, Validators.required],
      parteComestible: [1, Validators.required],
      
      //aminoacidos
      acido_aspartico:[1,Validators.required],
      treonina:[1,Validators.required],
      serina:[1,Validators.required],
      acido_glutaminico:[1,Validators.required],
      prolina:[1,Validators.required],
      glicina:[1,Validators.required],
      alanina:[1,Validators.required],
      cisteina:[1,Validators.required],
      valina:[1,Validators.required],
      metionina:[1,Validators.required],
      isoleucina:[1,Validators.required],
      leucina:[1,Validators.required],
      tirosina:[1,Validators.required],
      fenilalanina:[1,Validators.required],
      histidina:[1,Validators.required],
      lisina:[1,Validators.required],
      arginina:[1,Validators.required],
      triptofano:[1,Validators.required]
    });
   
  }

  traerCategorias() {
    this.categoriaService.cargarCategoria().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    })
  }
desplegarForm(){
  if(!this.ctrlAminoacido){
    this.ctrlAminoacido = true;
  }else if(this.ctrlAminoacido){
    this.ctrlAminoacido= false;
  }
}

desplegarForm1(){
  if(!this.ctrlAzucar){
    this.ctrlAzucar= true;
  }else if(this.ctrlAzucar){
    this.ctrlAzucar= false;
  }
}

ocultardiv(tipo:string){
  if(tipo=='azucar'){
    this.ctrlAzucar = false;
  }else if(tipo == 'aminoacido'){
    this.ctrlAminoacido = false;
  }
}

}
