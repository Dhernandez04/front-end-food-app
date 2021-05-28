import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './pages/notfound/notfound.component';

import { MantenimientoRoutingModule } from './mantenimiento/mantemiento.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';




const routes: Routes = [
 
  {path:'',pathMatch:'full',redirectTo:'/login'},
  {path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MantenimientoRoutingModule,
    PagesRoutingModule,
    AuthRoutingModule
 ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
