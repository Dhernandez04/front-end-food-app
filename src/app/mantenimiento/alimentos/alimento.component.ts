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

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})

export class AlimentoComponent implements OnInit {
  step: any = 1;
  formaAlimento: FormGroup;

  public categorias: Categoria[] = [];

  idRes: number;
  idMin: number;
  idVit: number;
  idAci: number;
  composi: Compocision;





  
  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, 
    private alimentoService: AlimentoService,
    private mineralService: MineralService,
    private acidograsoService: AcidograsoService,
    private vitaminaService: VitaminaService,
    private compocisionService: CompocisionService) { }

  ngOnInit(): void {
    this.crearForm();
    this.traerCategorias();
  }

  get nombreInvalid(){
    return this.formaAlimento.get('nombre').invalid && this.formaAlimento.get('nombre').touched;
  }

  get humedadInvalid(){
    return this.formaAlimento.get('humedad').invalid && this.formaAlimento.get('humedad').touched;
  }

  get energiakcInvalid(){
    return this.formaAlimento.get('energiaKcal').invalid && this.formaAlimento.get('energiaKcal').touched;
  }

  get energiakInvalid(){
    return this.formaAlimento.get('energiaKj').invalid && this.formaAlimento.get('energiaKj').touched;
  }

  get proteinaInvalid(){
    return this.formaAlimento.get('proteinaG').invalid && this.formaAlimento.get('proteinaG').touched;
  }

  get lipidosInvalid(){
    return this.formaAlimento.get('lipidosG').invalid && this.formaAlimento.get('lipidosG').touched;
  }

  get carb1Invalid(){
    return this.formaAlimento.get('carbohidratos_total').invalid && this.formaAlimento.get('carbohidratos_total').touched;
  }

  get carb2Invalid(){
    return this.formaAlimento.get('carbohidratos_disp').invalid && this.formaAlimento.get('carbohidratos_disp').touched;
  }

  get fibraInvalid(){
    return this.formaAlimento.get('fibra_dietaria').invalid && this.formaAlimento.get('fibra_dietaria').touched;
  }

  get cenizaInvalid(){
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
     this.alimentoService.crearAlimento(this.formaAlimento.value).subscribe((res:any)=>{
      console.log(res);
      this.idRes=res.alimento.codigo;
      console.log("Dato obtenido: "+this.idRes)
      const observable = forkJoin({
        obs1: this.agregarMineral(),
        obs2: this.agregarAcido(),
        obs3: this.agregarVitamina(),
      });
      observable.subscribe({
       next: value => console.log(value),
       complete: () => console.log('This is how it ends!'),
       
      });
    });
  }

  agregarMineral(){
      this.mineralService.crearMineral(this.formaAlimento.value).subscribe((res:any)=>{
        console.log(res);
        this.idMin=res.mineral.codigom;
      })
  }

  agregarAcido(){
      this.acidograsoService.crearAcido(this.formaAlimento.value).subscribe((res:any)=>{
        console.log(res);
        this.idAci=res.acido_graso.codigoa;
      })
  }

  agregarVitamina(){
    this.vitaminaService.crearVitamina(this.formaAlimento.value).subscribe((res:any)=>{
      console.log(res);
      this.idVit=res.vitamina.codigov;
    })
  }

  
  agregarComposicion(){
    this.composi={
       id_minerales:this.idMin,
       id_vitaminas: this.idVit,
       id_acidosGrasos: this.idAci,
       cod_alimento: this.idRes,
       estado: "Aprobado",
    };
   
    
    this.compocisionService.crearComposiciones(this.composi).subscribe((res:any)=>{
      console.log(res);
      this.idVit=res.vitamina.codigov;
    })
  }

  crearForm() {
    this.formaAlimento = this.fb.group({
      id_categoria: ['1', Validators.required],
      nombre: ['Prueba2', Validators.required],
      parte_analizada: ['semilla', Validators.required],
      humedad: ['1', Validators.required],
      energiaKcal: ['1', Validators.required],
      energiaKj: ['1', Validators.required],
      proteinaG: ['1', Validators.required],
      lipidosG: ['1', Validators.required],
      carbohidratos_total: ['1', Validators.required],
      carbohidratos_disp: ['1', Validators.required],
      fibra_dietaria: ['1', Validators.required],
      cenizas: ['1', Validators.required],
      calcio:['1',Validators.required],
      hierro:['1',Validators.required],
      sodio:['1',Validators.required],
      fosforo:['1',Validators.required],
      yodo:['1',Validators.required],
      zinc:['1',Validators.required],
      magnecio:['1',Validators.required],
      potasio:['1',Validators.required],
      tiamina:['1',Validators.required],
      riboflaxina:['1',Validators.required],
      niaxina:['1',Validators.required],
      folatos:['1',Validators.required],
      vitaminaA:['1',Validators.required],
      vitaminaC:['1',Validators.required],
      vitamina_b12:['1',Validators.required],
      grasaSaturada:['1',Validators.required],
      grasaMenosSaturada:['1',Validators.required],
      grasaPoliinsaturada:['1',Validators.required],
      colesterol:['1',Validators.required],
      parteComestible:['1',Validators.required]
    });
  }

  traerCategorias(){
    this.categoriaService.cargarCategoria().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    })
  }


}
