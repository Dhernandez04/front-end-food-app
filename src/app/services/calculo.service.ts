import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"
import { environment } from '../../environments/environment';
import { analisis } from "../interfaces/analisis.interfaces";



const base_url = environment.base_url
@Injectable({
   providedIn: 'root'
})
export class CalculoService{
   
    constructor(private http: HttpClient){}
    get token():string {
        return localStorage.getItem('token');
      }
      
    hacerCalculo(Datos: analisis){
        const url=`${base_url}/api/calculos`;
        return this.http.post(url,Datos,{headers:{'x-token':this.token}});
    }
}