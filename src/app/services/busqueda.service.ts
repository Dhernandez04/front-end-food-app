import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Alimento } from '../models/alimento.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }
  
  get token(): string {
    return localStorage.getItem('token');
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  private transformarUsuarios(resultados:any[]):Usuario[]{
     return resultados.map( user => new Usuario(user.nombre,user.apellido,user.email,user.id_rol,user.activo,'',user.imagen,user.id))
  }
  private transformarAlimentos(resultados:any[]):Alimento[]{
    return resultados;
 }
  cargarComposicion(id) {
    return this.http.get(`${base_url}/api/buscar/composicion/${id}`,this.headers).pipe(
      map(( resp :any) => {
        return resp;
      })
    );
  }

  buscar(tipo:'usuarios'|'alimentos'|'categorias',termino:string){
    return this.http.get<any[]>(`${base_url}/api/buscar/${tipo}/${termino}`,this.headers).pipe(
      map(( resp :any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados)
          case 'alimentos':
              return resp.resultados;
      
            case 'categorias':
              return resp.resultados;
          default:
            return [];
        }
      })
    );
  }



}
