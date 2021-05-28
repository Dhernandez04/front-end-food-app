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
import { UsuarioComponent } from './usuarios/usuario.component';
import { NotfoundComponent } from '../pages/notfound/notfound.component';
import { PerfilComponent } from '../shared/perfil/perfil.component';



const routes:Routes = [
    {path:'admin',
        component: MantenimientoComponent,
        canActivate:[AuthGuard],
        children:[
        {path:'',component:DashboardComponent},
         {path:'dashboard',component:DashboardComponent},
         {path:'alimentos',component:AlimentosComponent},
         {path:'alimentos/:tipo/:id',component:AlimentoComponent},
         {path:'roles',component:RolesComponent},
         {path:'usuarios',component:UsuariosComponent},
         {path:'usuarios/nuevo',component:UsuarioComponent},
         {path:'categorias',component:CategoriasComponent},
         {path:'perfil',component:PerfilComponent},
         
         {path:'**', component:NotfoundComponent }
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
