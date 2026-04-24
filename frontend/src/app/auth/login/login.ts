import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';
  cargando = false;
  usernameError = '';
  passwordError = '';
  mostrarPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  validarUsername(): void {
    if (!this.username) {
      this.usernameError = 'El usuario es obligatorio';
    } else if (this.username.length < 3) {
      this.usernameError = 'Mínimo 3 caracteres';
    } else {
      this.usernameError = '';
    }
  }

  validarPassword(): void {
    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria';
    } else if (this.password.length < 3) {
      this.passwordError = 'Mínimo 3 caracteres';
    } else {
      this.passwordError = '';
    }
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

 login(): void {
  this.validarUsername();
  this.validarPassword();

  if (this.usernameError || this.passwordError) return;

  this.cargando = true;
  this.error = '';

  this.authService.login(this.username, this.password).subscribe({
    next: (res: any) => {
      this.authService.guardarToken(res.token);
      this.authService.guardarUsername(this.username);
      this.router.navigate(['/caja']);
    },
    error: () => {
      this.error = 'Usuario o contraseña incorrectos';
      this.cargando = false;
    }
  });
}
}
