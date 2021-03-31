import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CalculosComponent } from './calculos/calculos.component';
import { CatalogoComponent } from './catalogo/catalogo.component';


//mantenimiento



const routes:Routes = [
    {path:'',
        component:PagesComponent,
        children:[
         {path:'calculos',component:CalculosComponent},
         {path:'catalogo',component:CatalogoComponent},
         
        
         {path:'', redirectTo:'/calculos',pathMatch:'full'},
        ]
     }
    
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
     ],
     exports:[
        RouterModule
     ]
   
})
export class  PagesRoutingModule { }