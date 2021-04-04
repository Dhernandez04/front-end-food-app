import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RolesComponent } from './roles/roles.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AlimentoComponent } from './alimentos/alimento.component';



@NgModule({
  declarations: [
    MantenimientoComponent,
    SidebarComponent,
    DashboardComponent,
    UsuariosComponent,
    AlimentosComponent,
    CategoriasComponent,
    RolesComponent,
    AlimentoComponent],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    SidebarComponent,
    AlimentosComponent,
    CategoriasComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule

  ]
})
export class MantenimientoModule { }
