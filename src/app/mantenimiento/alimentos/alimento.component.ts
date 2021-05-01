import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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


@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})

export class AlimentoComponent implements OnInit {
  step: any = 1;
  formaAlimento: FormGroup;
  composicionSelecionanda: any;
  public categorias: Categoria[] = [];

  idRes: number;
  idMin: number;
  idVit: number;
  idAci: number;
  composi: Compocision;

  constructor(

    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private alimentoService: AlimentoService,
    private mineralService: MineralService,
    private acidograsoService: AcidograsoService,
    private vitaminaService: VitaminaService,
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
  
      console.log(resp);
      
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
        parteComestible: resp.composicionDB.acidos_graso.parteComestible
      })

    })
  }

  cargarStep(tipo) {
    if (tipo === 'mineral') {
      this.step = 2;
    } else if (tipo === 'acidograso') {
      this.step = 4;
    } else if (tipo === 'vitamina') {
      this.step=3
    } else {
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

  agregar() {
  
    
    if(this.id !== 'nuevo'){
      
      console.log(this.tipo);
      
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

        this.agregarComposicion(this.composi);
        this.router.navigateByUrl('/dashboard/alimentos')
      });
      });
    }
    
   
    
  }

  agregarMineral() {
    return this.mineralService.crearMineral(this.formaAlimento.value)
  }

  agregarAcido() {
    return this.acidograsoService.crearAcido(this.formaAlimento.value)
  }

  agregarVitamina() {
    return this.vitaminaService.crearVitamina(this.formaAlimento.value);
  }


  agregarComposicion(compocision) {
    this.compocisionService.crearComposiciones(compocision).subscribe((res: any) => {
      Swal.fire('success', 'Alimento agregado', 'success')

    })
  }

  crearForm() {
    this.formaAlimento = this.fb.group({
      id_categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      parte_analizada: ['', Validators.required],
      humedad: ['', Validators.required],
      energiaKcal: ['', Validators.required],
      energiaKj: ['', Validators.required],
      proteinaG: ['', Validators.required],
      lipidosG: ['', Validators.required],
      carbohidratos_total: ['', Validators.required],
      carbohidratos_disp: ['', Validators.required],
      fibra_dietaria: ['', Validators.required],
      cenizas: ['', Validators.required],
      calcio: ['', Validators.required],
      hierro: ['', Validators.required],
      sodio: ['', Validators.required],
      fosforo: ['', Validators.required],
      yodo: ['', Validators.required],
      zinc: ['', Validators.required],
      magnecio: ['', Validators.required],
      potasio: ['', Validators.required],
      tiamina: ['', Validators.required],
      riboflaxina: ['', Validators.required],
      niaxina: ['', Validators.required],
      folatos: ['', Validators.required],
      vitaminaA: ['', Validators.required],
      vitaminaC: ['', Validators.required],
      vitamina_b12: ['', Validators.required],
      grasaSaturada: ['', Validators.required],
      grasaMenosSaturada: ['', Validators.required],
      grasaPoliinsaturada: ['', Validators.required],
      colesterol: ['', Validators.required],
      parteComestible: ['', Validators.required]
    });
  }

  traerCategorias() {
    this.categoriaService.cargarCategoria().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    })
  }

  extraerrData(resp:any) {
   

  }

}
