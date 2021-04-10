import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Mineral } from '../models/mineral.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MineralService {

  constructor(private http: HttpClient) { }
  
  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }

  
  crearMineral(data:Mineral) {
    return this.http.post(`${base_url}/api/minerales`,data,this.headers);
  }
}
