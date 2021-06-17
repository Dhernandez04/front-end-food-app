import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { forkJoin, of, timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { AlimentoService } from '../../services/alimento.service';
import { MineralService } from '../../services/mineral.service';
import { VitaminaService } from '../../services/vitamina.service';
import { AcidograsoService } from '../../services/acidograso.service';
import { CompocisionService } from '../../services/compocision.service';
import { AminoacidoService } from 'src/app/services/aminoacido.service';

import { Compocision } from '../../models/Compocision';
import { AzucarService } from 'src/app/services/azucar.service';


@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})

export class AlimentoComponent implements OnInit {
  step: any = 1;
  formaAlimento: FormGroup; //formulario de alimentos
  // variables para cargar los datos cuando se edita el formulario
  composicionSelecionanda: any;
  Aminoacido: any;
  public categorias: Categoria[] = [];
  Azucar:any;

  idRes: number; //aqui se almacena temporalmente el id del alimento para luego asignarla a la tabla de composicion 

  composi: Compocision;
  // variable para abrir los formulario de aminoacidos y azucares
  ctrlAminoacido: boolean = false;
  ctrlAzucar: boolean = false;

  //variables para ocultar formulario de acidos grasos cuando se editan los aminoacidos o aucares
  crtlEdit = false;

  //aqui se almacenan los valores que vienen por la url
  public id: string;
  public tipo: string;
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private alimentoService: AlimentoService,
    private mineralService: MineralService,
    private acidograsoService: AcidograsoService,
    private vitaminaService: VitaminaService,
    private aminoacidoService: AminoacidoService,
    private azucarService:AzucarService,
    private compocisionService: CompocisionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

   

  ngOnInit(): void {
    this.crearForm();
    this.traerCategorias();
    this.activatedRoute.params.subscribe(({ id, tipo }) => {
      this.id = id;
      this.tipo = tipo;
      this.cargarStep(tipo);

      if(this.id!=='nuevo'){
        this.cargarcomposicionPorId(id);
      }
 
      
    })

  }
  
  // cargando la composicion del alimento
  cargarcomposicionPorId(id: number) {
    this.cargarAminoacido(id);
    this.cargarAzucar(id);
    this.compocisionService.ComposicionById(id).subscribe((resp: any) => {
      this.composicionSelecionanda = resp;
   if(this.Azucar == null){
     this.Azucar={azucares_disponibles:'',
                  azucares_no_reductores:'',
                  azucares_reductores:'',
                  fructosa:'',
                  galactosa:'',
                  Glucosa:'',
                  lactosa:'',
                  Sacarosa:'',}
    
                }
                if(this.Aminoacido==null){
                  this.Aminoacido={
                    acido_aspartico:'',
                    treonina:'',
                    serina:'',
                    acido_glutaminico:'',
                    prolina:'',
                    glicina:'',
                    alanina:'',
                    cisteina:'',
                    valina:'',
                    metionina:'',
                    isoleucina:'',
                    leucina:'',
                    tirosina:'',
                    fenilalanina:'',
                    histidina:'',
                    lisina:'',
                    arginina:'',
                    triptofano:'',
                  }
                }
      this.formaAlimento.setValue({
        id_categoria: resp.composicionDB.alimento.id_categoria,
        nombre: resp.composicionDB.alimento.nombre,
        parte_analizada: resp.composicionDB.alimento.parte_analizada,
        humedad: resp.composicionDB.alimento.humedad,
        energiaKcal: resp.composicionDB.alimento.energiaKcal,
        energiaKj: resp.composicionDB.alimento.energiaKj,
        proteinaG: resp.composicionDB.alimento.proteinaG,
        lipidosG: resp.composicionDB.alimento.lipidosG,
        carbohidratos_total: resp.composicionDB.alimento.carbohidratos_total,
        carbohidratos_disp: resp.composicionDB.alimento.carbohidratos_disp,
        fibra_dietaria: resp.composicionDB.alimento.fibra_dietaria,
        cenizas: resp.composicionDB.alimento.cenizas,
        calcio: resp.composicionDB.minerale.calcio,
        hierro: resp.composicionDB.minerale.hierro,
        sodio: resp.composicionDB.minerale.sodio,
        fosforo: resp.composicionDB.minerale.fosforo,
        yodo: resp.composicionDB.minerale.yodo,
        zinc: resp.composicionDB.minerale.zinc,
        magnecio: resp.composicionDB.minerale.magnecio,
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
        acido_aspartico: this.Aminoacido.acido_aspartico,
        treonina: this.Aminoacido.treonina,
        serina: this.Aminoacido.serina,
        acido_glutaminico: this.Aminoacido.acido_glutaminico,
        prolina: this.Aminoacido.prolina,
        glicina: this.Aminoacido.glicina,
        alanina: this.Aminoacido.alanina,
        cisteina: this.Aminoacido.cisteina,
        valina: this.Aminoacido.valina,
        metionina: this.Aminoacido.metionina,
        isoleucina: this.Aminoacido.isoleucina,
        leucina: this.Aminoacido.leucina,
        tirosina: this.Aminoacido.tirosina,
        fenilalanina: this.Aminoacido.fenilalanina,
        histidina: this.Aminoacido.histidina,
        lisina: this.Aminoacido.lisina,
        arginina: this.Aminoacido.arginina,
        triptofano: this.Aminoacido.triptofano,
        //azucar
        azucares_disponibles:this.Azucar.azucares_disponibles,
        azucares_no_reductores:this.Azucar.azucares_no_reductores,
        azucares_reductores:this.Azucar.azucares_reductores,
        fructosa:this.Azucar.fructosa,
        galactosa:this.Azucar.galactosa,
        Glucosa:this.Azucar.Glucosa,
        lactosa:this.Azucar.lactosa,
        Sacarosa:this.Azucar.Sacarosa,
      })

      
    })
  }
  cargarAminoacido(id: number){
    this.aminoacidoService.cargarAminoacido(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.Aminoacido=resp['aminoacidoDB'];
        
        
      }else{
      }
    })
  }

  cargarAzucar(id: number){
    this.azucarService.cargarAzucar(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.Azucar=resp['azucarDB'];
      
      }else{
      }
    })
  }
  //control del formulario
  cargarStep(tipo) {
    if (tipo === 'mineral') {
      this.step = 2;
    } else if (tipo === 'acidograso') {
      this.step = 4;
    } else if (tipo === 'vitamina') {
      this.step = 3
    } else if (tipo === 'azucar') {
      this.step = 4;
      this.ctrlAzucar = true;
      this.crtlEdit = true;
    } else if (tipo == 'aminoacido') {
      this.step = 4;
      this.ctrlAminoacido = true;
      this.crtlEdit = true;
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
  //metodo para agregar o actualizar composicion
  agregar() {
    if (this.id !== 'nuevo') {
      switch (this.tipo) {
        case 'alimento':
          this.alimentoService.actualizarAlimento(this.id, this.formaAlimento.value).subscribe((resp: any) => {
           
            Swal.fire('success', `${resp.msg}`, 'success');
            this.router.navigateByUrl('/admin/alimentos')
          })
          break;
        case 'vitamina':
          this.vitaminaService.actualizarVitamina(this.id, this.formaAlimento.value).subscribe((resp: any) => {
            Swal.fire('success', `${resp.msg}`, 'success');
            this.router.navigateByUrl('/admin/alimentos')
          })
          break;
        case 'mineral':
          this.mineralService.actualizarMineral(this.id, this.formaAlimento.value).subscribe((resp: any) => {
            Swal.fire('success', `${resp.msg}`, 'success');
            this.router.navigateByUrl('/admin/alimentos')
          })

        case 'acidograso':
          this.acidograsoService.actualiarAcido(this.id, this.formaAlimento.value).subscribe((resp: any) => {
            Swal.fire('success', `${resp.msg}`, 'success');
            this.router.navigateByUrl('/admin/alimentos')
          })
          break;

        case 'aminoacido':
          this.aminoacidoService.actualizarAminoacido(this.id, this.formaAlimento.value).subscribe((resp: any) => {
            Swal.fire('success', `${resp.msg}`, 'success');
            this.router.navigateByUrl('/admin/alimentos')
          })
          break;
        
        case'azucar':
        this.azucarService.actualizarAzucar(this.id,this.formaAlimento.value).subscribe((resp:any)=>{
         Swal.fire('success', `${resp.msg}`, 'success');
         this.router.navigateByUrl('/admin/alimentos')
        })
        break;
       

        default:
          break;
      }
    } else {
      this.alimentoService.crearAlimento(this.formaAlimento.value).subscribe((res: any) => {
        this.idRes = res.alimento.codigo;
        const observable = forkJoin({
          obs1: this.agregarMineral(),
          obs2: this.agregarAcido(),
          obs3: this.agregarVitamina(),

        });
        observable.subscribe((value: any) => {
          this.composi = {
            id_minerales: value.obs1.mineral.codigom,
            id_vitaminas: value.obs2.acido_graso.codigoa,
            id_acidosGrasos: value.obs3.vitamina.codigov,
            cod_alimento: this.idRes,
            estado: "Aprobado",
          }; 
console.log(value.obs1.mineral);


          //se manda el id del alimento si tiene aminoacido
          if (this.ctrlAminoacido) {
          // solo si el usuario desea crear un aminoacido
            this.agregarAminoacido(this.idRes);
            this.agregarComposicion(this.composi);
            this.router.navigateByUrl('/admin/alimentos')
          }else if(this.ctrlAzucar){
            // solo si el usuario desea crear un azucar
            this.agregarAzucar(this.idRes);
            this.agregarComposicion(this.composi);
            this.router.navigateByUrl('/admin/alimentos')
          }else if(this.ctrlAzucar && this.ctrlAminoacido){
            // solo si desea agregar ambos 
            this.agregarAminoacido(this.idRes);
            this.agregarAzucar(this.idRes);
            this.agregarComposicion(this.composi);
            this.router.navigateByUrl('/admin/alimentos')
          }
          else {
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

  agregarAminoacido(id) {
    return this.aminoacidoService.crearAminoacido(this.formaAlimento.value, id).subscribe((res: any) => {
     
    });
  }
  agregarAzucar(id) {
    return this.azucarService.crearAzucar(this.formaAlimento.value, id).subscribe((res: any) => {
     
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
      id_categoria: ['',Validators.required],
      nombre: ['', Validators.required],
      parte_analizada: ['', Validators.required],
      humedad: [ Validators.required],
      energiaKcal: [ Validators.required],
      energiaKj: [ Validators.required],
      proteinaG: [Validators.required],
      lipidosG: [ Validators.required],
      carbohidratos_total: [ Validators.required],
      carbohidratos_disp: [ Validators.required],
      fibra_dietaria: [ Validators.required],
      cenizas: [ Validators.required],
      calcio: [ Validators.required],
      hierro: [ Validators.required],
      sodio: [ Validators.required],
      fosforo: [ Validators.required],
      yodo: [ Validators.required],
      zinc: [ Validators.required],
      magnecio: [ Validators.required],
      potasio: [ Validators.required],
      tiamina: [ Validators.required],
      riboflaxina: [ Validators.required],
      niaxina: [ Validators.required],
      folatos: [ Validators.required],
      vitaminaA: [ Validators.required],
      vitaminaC: [ Validators.required],
      vitamina_b12: [ Validators.required],
      grasaSaturada: [ Validators.required],
      grasaMenosSaturada: [ Validators.required],
      grasaPoliinsaturada: [ Validators.required],
      colesterol: [ Validators.required],
      parteComestible: [ Validators.required],

      //aminoacidos
      acido_aspartico: ['', Validators.required],
      treonina: ['', Validators.required],
      serina: ['', Validators.required],
      acido_glutaminico: ['', Validators.required],
      prolina: ['', Validators.required],
      glicina: ['', Validators.required],
      alanina: ['', Validators.required],
      cisteina: ['', Validators.required],
      valina: ['', Validators.required],
      metionina: ['', Validators.required],
      isoleucina: ['', Validators.required],
      leucina: ['', Validators.required],
      tirosina: ['', Validators.required],
      fenilalanina: ['', Validators.required],
      histidina: ['', Validators.required],
      lisina: ['', Validators.required],
      arginina: ['', Validators.required],
      triptofano: ['', Validators.required],

      //azucares
      azucares_disponibles:['', Validators.required],
      azucares_no_reductores:['', Validators.required],
      azucares_reductores:['', Validators.required],
      fructosa:['', Validators.required],
      galactosa:['', Validators.required],
      Glucosa:['', Validators.required],
      lactosa:['', Validators.required],
      Sacarosa:['', Validators.required],
    });

  }

  traerCategorias() {
    this.categoriaService.cargarCategoria().subscribe((resp) => {
      this.categorias = resp.categorias;
    })
  }
  desplegarForm() {
    if (!this.ctrlAminoacido) {
      this.ctrlAminoacido = true;
    } else if (this.ctrlAminoacido) {
      this.ctrlAminoacido = false;
    }
  }

  desplegarForm1() {
    if (!this.ctrlAzucar) {
      this.ctrlAzucar = true;
    } else if (this.ctrlAzucar) {
      this.ctrlAzucar = false;
    }
  }

  ocultardiv(tipo: string) {
    if (tipo == 'azucar') {
      this.ctrlAzucar = false;
    } else if (tipo == 'aminoacido') {
      this.ctrlAminoacido = false;
    }
  }

}
