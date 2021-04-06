import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }
  get token():string {
    return localStorage.getItem('token');
  }


  cargarComposicion(id) {
    return this.http.get(`${base_url}/api/buscar/composicion/${id}`,{headers:{'x-token':this.token}}).pipe(
      map(( resp :any) => {
        return resp;
      })
    );
  }
}
