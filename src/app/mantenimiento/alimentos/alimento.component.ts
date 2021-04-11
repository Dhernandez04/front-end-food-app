import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})
export class AlimentoComponent implements OnInit {
  step: any = 1;
  formaAlimento: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearForm();
  }

  get nombreInvalid(){
    return this.formaAlimento.get('nombre').invalid && this.formaAlimento.get('nombre').touched;
  }

  get humedadInvalid(){
    return this.formaAlimento.get('humedad').invalid && this.formaAlimento.get('humedad').touched;
  }

  get energiakcInvalid(){
    return this.formaAlimento.get('energiakc').invalid && this.formaAlimento.get('energiakc').touched;
  }

  get energiakInvalid(){
    return this.formaAlimento.get('energiak').invalid && this.formaAlimento.get('energiak').touched;
  }

  get proteinaInvalid(){
    return this.formaAlimento.get('proteina').invalid && this.formaAlimento.get('proteina').touched;
  }

  get lipidosInvalid(){
    return this.formaAlimento.get('lipidos').invalid && this.formaAlimento.get('lipidos').touched;
  }

  get carb1Invalid(){
    return this.formaAlimento.get('carb1').invalid && this.formaAlimento.get('carb1').touched;
  }

  get carb2Invalid(){
    return this.formaAlimento.get('carb2').invalid && this.formaAlimento.get('carb2').touched;
  }

  get fibraInvalid(){
    return this.formaAlimento.get('fibra').invalid && this.formaAlimento.get('fibra').touched;
  }

  get cenizaInvalid(){
    return this.formaAlimento.get('ceniza').invalid && this.formaAlimento.get('ceniza').touched;
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
    console.log(this.formaAlimento)
  }

  crearForm() {
    this.formaAlimento = this.fb.group({
      cat: ['', Validators.required],
      nombre: ['', Validators.required],
      parte1: ['', Validators.required],
      parte2: ['', Validators.required],
      humedad: ['', Validators.required],
      energiakc: ['', Validators.required],
      energiak: ['', Validators.required],
      proteina: ['', Validators.required],
      lipidos: ['', Validators.required],
      carb1: ['', Validators.required],
      carb2: ['', Validators.required],
      fibra: ['', Validators.required],
      ceniza: ['', Validators.required]
      /*
      mcalcio:['',Validators.required],
      mhierro:['',Validators.required],
      msodio:['',Validators.required],
      mfosoro:['',Validators.required],
      myodo:['',Validators.required],
      mzinc:['',Validators.required],
      mmag:['',Validators.required],
      mpota:['',Validators.required],
      vtiamina:['',Validators.required],
      vribo:['',Validators.required],
      vnia:['',Validators.required],
      vfola:['',Validators.required],
      vvA:['',Validators.required],
      vvC:['',Validators.required],
      vvB:['',Validators.required],
      agrasas:['',Validators.required],
      agrasam:['',Validators.required],
      agrasap:['',Validators.required],
      aCole:['',Validators.required],
      acomes:['',Validators.required]*/
    });
  }
}
