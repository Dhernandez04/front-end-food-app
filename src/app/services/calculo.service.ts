import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

@Injectable({
   providedIn: 'root'
})
export class CalculoService{
    constructor(private http: HttpClient){}

    hacerCalculo(temperatura: number){
        const url='http://localhost:3000/Api/calculos/';
        return this.http.post(url,temperatura);
    }
}