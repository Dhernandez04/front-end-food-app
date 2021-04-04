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
  cargarAlimetos() {
    return this.http.get(`${base_url}/api/alimentos`,{headers:{'x-token':this.token}}).pipe(
      map(( resp :{alimentos:Alimento[]}) => {
        return resp.alimentos;
      })
    );
  }


  cargarAliCatego(id: number) {
    const url =`${base_url}/api/buscar/alimentosc/${id}`;
    return this.http.get(url,{headers:{'x-token':this.token}});
}

}
