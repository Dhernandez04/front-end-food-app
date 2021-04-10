import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';


//mantenimiento
import { DashboardComponent } from './dashboard/dashboard.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { RolesComponent } from './roles/roles.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AuthGuard } from '../guards/auth.guard';
import { AlimentoComponent } from './alimentos/alimento.component';



const routes:Routes = [
    {path:'dashboard',
        component: MantenimientoComponent,
        canActivate:[AuthGuard],
        children:[
        {path:'',component:DashboardComponent},
        //  {path:'dashboard',component:DashboardComponent},
         {path:'alimentos',component:AlimentosComponent},
         {path:'alimento/:id',component:AlimentoComponent},
         {path:'usuarios',component:UsuariosComponent},
         {path:'roles',component:RolesComponent},
         {path:'categorias',component:CategoriasComponent},
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
