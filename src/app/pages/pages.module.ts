import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculosComponent } from './calculos/calculos.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PagesComponent,
    CalculosComponent,
    CatalogoComponent,
  ],
  exports: [
    CalculosComponent,
    CatalogoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
