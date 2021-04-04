import { Component } from '@angular/core';
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
export class LoginComponent {

  public formSumitted = false;
  public loginForm = this.fb.group({
    
    email: ['', Validators.required],
    password: ['', Validators.required],

    
  });
  constructor(private router:Router ,private fb:FormBuilder,private usuarioService:UsuarioService) { }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe((resp) => {
      this.router.navigateByUrl('/admin/dashboard')
    }, (err => {
      
      
      Swal.fire('error',err.error.msg,'error')
     }))    
  }
  
}
