import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';

@Injectable({
   providedIn: 'root'
})
export class CategoriaService{
    constructor(private http: HttpClient){}

    cargarCategoria(){
          return this.http.get(`http://localhost:3000/Api/categoria/`).pipe(
      map(( resp :{categoria:Categoria[]}) => {
        return resp.categoria;
      })
    );
    }
}