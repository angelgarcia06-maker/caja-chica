import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaComponent implements OnInit {

  usuarios: any[] = [];
  error = '';
  cargando = true;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.obtenerToken()}`
    });

    this.http.get<any[]>('/api/usuarios', { headers }).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }

  irARegistro(): void {
    this.router.navigate(['/usuarios/registro']);
  }

  irADashboard(): void {
    this.router.navigate(['/caja']);
  }
}