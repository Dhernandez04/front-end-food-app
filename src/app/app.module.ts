import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CalculosComponent } from './pages/calculos/calculos.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './mantenimiento/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { AlimentosComponent } from './mantenimiento/alimentos/alimentos.component';
import { CategoriasComponent } from './mantenimiento/categorias/categorias.component';
import { RolesComponent } from './mantenimiento/roles/roles.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CalculosComponent,
    SidebarComponent,
    DashboardComponent,
    NotfoundComponent,
    CatalogoComponent,
    PagesComponent,
    UsuariosComponent,
    AlimentosComponent,
    CategoriasComponent,
    RolesComponent,
    MantenimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
