import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastR: ToastrService,
              private router: Router){
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, {validator: this.checkPassword});
  }

  checkPassword(group: FormGroup): any{
    const pass = group.get('nuevaPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass? null : {notSame:true}
  }

  guardarPassword(): void{
    console.log(this.cambiarPassword)

    //Creamos un objeto con los datos que están en el back asociandolos a los que están en el formulario front
    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword

    };

    this.loading = true;
    //Utilizamos el método changePassword() de Usuario.service.ts
    this.usuarioService.changePassword(changePassword).subscribe(data =>{
      
      this.toastR.info(data.message);
      this.router.navigate(['/dashboard']);
    }, error =>{
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastR.error(error.error.message, 'Error!')
    });
    console.log(changePassword);
  }
}
