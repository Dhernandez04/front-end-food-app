import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{

  public formSumitted = false;
  public loginForm = this.fb.group({
    
    email: ['', Validators.required],
    password: ['', Validators.required],

    
  });
  constructor(private router:Router ,private fb:FormBuilder,private usuarioService:UsuarioService) { }
  ngOnInit(): void {
    
    
    if(this.usuarioService.token){
      if(Number(localStorage.getItem('role')) == 1){
        this.router.navigateByUrl('/admin/dashboard')
      }else{
        this.router.navigateByUrl('/home/calculos')
      }
    }else{
      this.router.navigateByUrl('/login')
    }
    }
  login() {
    this.usuarioService.login(this.loginForm.value).subscribe((resp) => {
      this.router.navigateByUrl('/admin/dashboard')
    }, (err => {
      
      
      Swal.fire('error',err.error.msg,'error')
     }))    
  }
  
}
