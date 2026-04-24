import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent {

  username = '';
  password = '';
  rol = 'EMPLEADO';
  error = '';
  exito = '';
  cargando = false;
  usernameError = '';
  passwordError = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

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

  onRolChange(): void {
  console.log('Rol seleccionado:', this.rol);
}

  registrar(): void {
    this.validarUsername();
    this.validarPassword();

    if (this.usernameError || this.passwordError) return;

    this.cargando = true;
    this.error = '';
    this.exito = '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.obtenerToken()}`
    });

    this.http.post('/api/usuarios', {
      username: this.username,
      password: this.password,
      rol: this.rol
    }, { headers }).subscribe({
      next: () => {
        this.exito = `Usuario "${this.username}" registrado correctamente`;
        this.username = '';
        this.password = '';
        this.rol = 'EMPLEADO';
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al registrar, el usuario ya existe';
        this.cargando = false;
      }
    });
  }

  irALista(): void {
    this.router.navigate(['/usuarios/lista']);
  }

  irADashboard(): void {
    this.router.navigate(['/caja']);
  }
}