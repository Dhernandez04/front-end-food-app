import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AzucarService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token');
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  crearAzucar(data, id) {
    return this.http.post(`${base_url}/api/azucar`, { data, id_alimento: id }, this.headers);
  }
  actualizarAzucar(id, data) {
    return this.http.put(`${base_url}/api/azucar/${id}`, data, this.headers);
  }

  cargarAzucar(id: number) {
    return this.http.get(`${base_url}/api/azucar/${id}`,this.headers);
  }
}