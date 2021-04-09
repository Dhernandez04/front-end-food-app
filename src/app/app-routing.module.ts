import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './pages/notfound/notfound.component';

import { MantenimientoRoutingModule } from './mantenimiento/mantemiento.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registrar',component:RegisterComponent},
  {path:'',pathMatch:'full',redirectTo:'/admin/dashboard'},
  {path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MantenimientoRoutingModule,
    PagesRoutingModule,
 ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
