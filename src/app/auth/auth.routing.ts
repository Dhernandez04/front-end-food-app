import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';


//mantenimiento



const routes:Routes = [
    {path:'login',component:LoginComponent},
  {path:'registrar',component:RegisterComponent}
    
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
     ],
     exports:[
        RouterModule
     ]
   
})
export class  AuthRoutingModule { }
