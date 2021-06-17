import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AminoacidoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token');
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  crearAminoacido(data, id) {
    return this.http.post(`${base_url}/api/aminoacido`, { data, cod_alimento: id }, this.headers);
  }
  actualizarAminoacido(id, data) {
    return this.http.put(`${base_url}/api/aminoacido/${id}`, data, this.headers);
  }

  cargarAminoacido(id: number) {
    return this.http.get(`${base_url}/api/aminoacido/${id}`,this.headers);
  }
}
