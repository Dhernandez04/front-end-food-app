import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  public roles: any[] = [];
  public formSumitted = false;
  public usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    id_rol: [1, Validators.required]

  }, {
    validators: this.passIguales('password', 'password2')
  })
  constructor(private router: Router, private fb: FormBuilder,
    private usuarioService: UsuarioService, private rolService: RolService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rolService.obtenerRoles().subscribe((resp: any) => {
      this.roles = resp.roles;


    })
  }
  crearUsuario() {
    this.formSumitted = true;

    if (this.usuarioForm.invalid) {
      return;
    }

    //creando usuario
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe((resp) => {

      Swal.fire('success', 'Usuario creado!', 'success');

      this.router.navigateByUrl('/dashboard/usuarios')
      console.log('todo ok');

    }, (err => {
      Swal.fire('error', err.error.error.errors[0].message, 'error')
    })
    );

  }
  contrasenaNovalida() {
    const pass1 = this.usuarioForm.get('password').value;
    const pass2 = this.usuarioForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSumitted) {
      return true;
    } else {
      return false;
    }

  }

  campoNoValido(campo: string): boolean {
    if (this.usuarioForm.get(campo).invalid && this.formSumitted) {
      return true;
    }
    return false;

  }

  passIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noesIgual: true })
      }
    }

  }

}
