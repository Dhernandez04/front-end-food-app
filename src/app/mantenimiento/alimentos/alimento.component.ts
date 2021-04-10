import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styles: [
  ]
})
export class AlimentoComponent implements OnInit {
  step: any=1;
  constructor() { }

  ngOnInit(): void {
  }
  siguiente() {
    if (this.step < 5) {
      this.step = this.step + 1;
    }
  }
  previus() {
    if(this.step>0 && this.step<=5){

      this.step = this.step - 1;
    }
  }
  agregar() {
    
  }
}
