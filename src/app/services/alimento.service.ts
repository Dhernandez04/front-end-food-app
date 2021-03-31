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

  cargarAlimetos() {
    return this.http.get(`http://localhost:3000/api/alimentos`).pipe(
      map(( resp :{alimentos:Alimento[]}) => {
        return resp.alimentos;
      })
    );
  }

  cargarAliCatego(id: number){
    const url='http://localhost:3000/api/buscar/alimentosc/'+id;
    return this.http.get(url);
}

}
