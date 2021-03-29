import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalculosComponent } from './pages/calculos/calculos.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'calculos',component:CalculosComponent},
  {path:'catalogo',component:CatalogoComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'', redirectTo:'dashboard',pathMatch:'full'},
  {path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
