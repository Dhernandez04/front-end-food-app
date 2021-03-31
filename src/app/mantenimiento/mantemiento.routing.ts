import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';


//mantenimiento
import { DashboardComponent } from './dashboard/dashboard.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { RolesComponent } from './roles/roles.component';
import { CategoriasComponent } from './categorias/categorias.component';


const routes:Routes = [
    {path:'admin',
        component:MantenimientoComponent,
        children:[
         {path:'dashboard',component:DashboardComponent},
         {path:'alimentos',component:AlimentosComponent},
         {path:'usuarios',component:UsuariosComponent},
         {path:'roles',component:RolesComponent},
         {path:'categorias',component:CategoriasComponent},
        
         {path:'', redirectTo:'/dashboard',pathMatch:'full'},
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
export class  MantenimientoRoutingModule { }
