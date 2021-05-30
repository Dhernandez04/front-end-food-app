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
  constructor(private http: HttpClient, private router: Router) {

  }
  get token(): string {
    return localStorage.getItem('token');
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  get role(){
    return this.usuario.id_rol;
  }
  get id():string {
    return this.usuario.id || '';

  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/api/auth/renew`, { headers: { 'x-token': token } }).pipe(
      map((resp: any) => {
        
        const { nombre, apellido, email, id_rol, activo, imagen, id, } = resp.usuario;
        this.usuario = new Usuario(nombre, apellido, email, id_rol, activo, '', imagen, id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role',id_rol)
     return true;
      }),
   
      catchError(error => of(false)
      )
    )
  }

  obtenerUsuarios(desde: number = 0) {
    return this.http.get(`${base_url}/api/usuarios?desde=${desde}`, this.headers).pipe(
      map((resp: { role:any,usuarios: Usuario[] }) => {
        const usuarios = resp.usuarios.map(user => new Usuario(user.nombre,user.apellido,user.email,user.id_rol,user.activo,'',user.imagen,user.id))
        return usuarios;
      })
 
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/api/auth/register`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);

      })
    )
  }
  nuevoUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/api/usuarios`, formData, this.headers);
  }

  login(formLogin: LoginForm) {
    return this.http.post(`${base_url}/api/auth/login`, formLogin).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login')
  }
  eliminarUsuario(usuario: Usuario) {
    
    return this.http.delete(`${base_url}/api/usuarios/${usuario.id}`,this.headers)
     
   }

   actualizarPerfil(data:{email:string,nombre:string,id_rol:number}){
     data = {
       ...data,
       id_rol:this.usuario.id_rol
     }
    return this.http.put(`${base_url}/api/usuarios/${this.id}`,data, this.headers)
   }

}
