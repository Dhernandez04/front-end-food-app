import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { environment } from '../../environments/environment';


const base_url = environment.base_url

@Injectable({
   providedIn: 'root'
})
export class CategoriaService{
    constructor(private http: HttpClient){}
    get token():string {
      return localStorage.getItem('token');
    }
    cargarCategoria(){
          return this.http.get(`${base_url}/api/categoria`,{headers:{'x-token':this.token}}).pipe(
      map(( resp :{categoria:Categoria[]}) => {
        return resp.categoria;
      })
    );
    }
}