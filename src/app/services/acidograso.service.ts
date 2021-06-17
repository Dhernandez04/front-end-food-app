import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcidoGraso } from '../models/AcidoGraso';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AcidograsoService {

  constructor(private http: HttpClient) { }
  
  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }

  crearAcido(data:AcidoGraso) {
    return this.http.post(`${base_url}/api/acidos`,data,this.headers);
  }
  actualiarAcido(id,data){
       return this.http.put(`${base_url}/api/acidos/${id}`,data,this.headers);
  }
}
