import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Compocision } from '../models/Compocision';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class CompocisionService {

  constructor(private http: HttpClient) { }
  
  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }
  
  cargarComposiciones(desde:number=0)   {
    return this.http.get(`${base_url}/api/composicion?desde=${desde}`,this.headers);
  }

  crearComposiciones(data:Compocision) {
    return this.http.post(`${base_url}/api/composicion`,data,this.headers);
  }
}
