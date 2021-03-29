import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Alimento } from '../models/alimento.model';
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
}
