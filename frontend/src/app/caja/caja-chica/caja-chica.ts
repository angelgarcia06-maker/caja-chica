import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CajaService } from '../../services/caja';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-caja-chica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caja-chica.html',
  styleUrl: './caja-chica.scss'

})
export class CajaChicaComponent implements OnInit {

  cajas: any[] = [];
  montoInicial: number | null = null;
  error = '';
  exito = '';
  cargando = false;
  esAdmin = false;
  usernameActual = '';

  constructor(
    private cajaService: CajaService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

 ngOnInit(): void {
  this.authService.obtenerRolDesdeApi(this.http);
  setTimeout(() => {
    this.esAdmin = this.authService.esAdmin();
    this.usernameActual = this.authService.obtenerUsername() || '';
  }, 500);
  this.cargarCajas();
}

  cargarCajas(): void {
    this.cajaService.listarCajas().subscribe({
      next: (data) => this.cajas = data,
      error: () => this.error = 'Error al cargar las cajas'
    });
  }

  crearCaja(): void {
    if (!this.montoInicial || this.montoInicial <= 0) {
      this.error = 'Ingresa un monto válido mayor a 0';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.exito = '';

    this.cajaService.crearCaja(this.montoInicial).subscribe({
      next: () => {
        this.exito = 'Caja creada correctamente';
        this.montoInicial = null;
        this.cargando = false;
        this.cargarCajas();
      },
      error: () => {
        this.error = 'Error al crear la caja';
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  irARegistro(): void {
    this.router.navigate(['/usuarios/registro']);
  }

  irALista(): void {
    this.router.navigate(['/usuarios/lista']);
  }

  irAMovimientos(): void {
    this.router.navigate(['/movimientos']);
  }
}
