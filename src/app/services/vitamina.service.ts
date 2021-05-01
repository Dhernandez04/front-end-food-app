import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vitamina } from '../models/Vitamina.model';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class VitaminaService {

  constructor(private http: HttpClient) { }
  
  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }

  crearVitamina(data:Vitamina) {
    return this.http.post(`${base_url}/api/vitaminas`,data,this.headers);
  }

  actualizarVitamina(id,data:Vitamina) {
    return this.http.put(`${base_url}/api/vitaminas/${id}`,data,this.headers);
  }
}
