import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) { }
  get token(): string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
    }
  obtenerRoles() {
    return this.http.get(`${base_url}/api/roles`, this.headers);
  }
  crearRol(nombre:string){
    return this.http.post(`${base_url}/api/roles`,{nombre}, this.headers);
  }
  eliminarRol(rol:any){
    return this.http.delete(`${base_url}/api/roles/${rol.id}`, this.headers);
  }
}
