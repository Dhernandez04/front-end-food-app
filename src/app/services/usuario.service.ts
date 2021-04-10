import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  constructor(private http: HttpClient,private router:Router) {
    
  }
  
  validarToken():Observable<boolean> {
    
   return this.http.get(`${base_url}/api/auth/renew`, {
      headers: {
        'x-token':this.token
      }
    }).pipe(
      map((resp: any) => {
       const{nombre, apellido, email,id_rol,activo ,imagen, id,} = resp.usuario;
        this.usuario = new Usuario(nombre, apellido, email, id_rol, activo,'', imagen, id);
         
          
        //localStorage.setItem('token', resp.token);
        
        return true
        }),
       
        catchError(error => of(false)
        )
    )
  }
  get token():string {
    return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
    }
  

  obtenerUsuarios() {
    return this.http.get(`${base_url}/api/usuarios`, this.headers).pipe(
      map(( resp :{usuarios:Usuario[]}) => {
        return resp.usuarios;
      })
    );
  }
  
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/api/auth/register`, formData).pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  login(formLogin: LoginForm) {
    return this.http.post(`${base_url}/api/auth/login`, formLogin).pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
}
