import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modulos
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { AuthModule } from './auth/auth.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { GraficaComponent } from './components/grafica/grafica.component';







@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
   
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    MantenimientoModule,
    AuthModule,
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
