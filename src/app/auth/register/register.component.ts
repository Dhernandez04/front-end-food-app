import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {
  public formSumitted = false;
  public registerForm = this.fb.group({
    nombre:[,Validators.required],
    apellido:[,Validators.required],
    email: [, Validators.required],
    password: [, Validators.required],
    password2: [, Validators.required],
    
  }, {
    validators:this.passIguales('password','password2')
  })
  constructor(private router:Router,private fb:FormBuilder,private usuarioService:UsuarioService) { }

  crearUsuario() {
    this.formSumitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    //creando usuario
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe((resp) => {
     
      this.router.navigateByUrl('/admin/dashboard')
      },(err => {
       Swal.fire('error',err.error.error.errors[0].message,'error')
      })
    );
    
  }
  contrasenaNovalida() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2)&& this.formSumitted) {
      return true;
    } else {
      return false;
    }
    
  }

  campoNoValido(campo: string): boolean{
    if (this.registerForm.get(campo).invalid && this.formSumitted) {
      return true;
    }
    return false;
    
  }

  passIguales(pass1: string, pass2: string) {
    return (formGroup:FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noesIgual:true})
      }
    }
    
  }
}
