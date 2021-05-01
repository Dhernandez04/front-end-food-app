import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Alimento } from '../models/alimento.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  constructor(private http:HttpClient) { }

  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
    }
  //metodo para listar los alimentos
  cargarAlimetos(desde:number=0) {
    return this.http.get(`${base_url}/api/alimentos?desde=${desde}`, this.headers);
  }

  //metodo para crear un alimento
  crearAlimento(data) {
    return this.http.post(`${base_url}/api/alimentos`, data, this.headers);
  }

  //metodo para cargar los alimentos asociados a una categoria
  cargarAliCatego(id: number) {
    const url =`${base_url}/api/buscar/alimentosc/${id}`;
    return this.http.get(url,this.headers);
  }
  
//metodo para obtener un alimento en especifico
   cargarAlimento(id: number) {
    return this.http.get(`${base_url}/api/alimentos/${id}`,this.headers).pipe(
      map(( resp :any) => {
        return resp;
      })
    );
  }
//metodo para actualizar alimento
  actualizarAlimento(id:number,data){
    console.log(this.headers);
    
    return this.http.put(`${base_url}/api/alimentos/${id}`, data,this.headers);
  }

}
