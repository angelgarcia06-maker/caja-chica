import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimiento.html',
  styleUrl: './movimiento.scss'
})
export class MovimientoComponent implements OnInit {

  cajas: any[] = [];
  movimientos: any[] = [];
  cajaId: number | null = null;
  tipo = 'INGRESO';
  monto: number | null = null;
  descripcion = '';
  error = '';
  exito = '';
  cargando = false;
  montoError = '';
  descripcionError = '';
  cajaError = '';
  esAdmin = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.esAdmin = this.authService.esAdmin();
  if (!this.esAdmin) {
    this.tipo = 'EGRESO';
  }
  this.cargarCajas();
  this.cargarMovimientos();
}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.obtenerToken()}`
    });
  }

  cargarCajas(): void {
    this.http.get<any[]>('/api/caja', { headers: this.getHeaders() }).subscribe({
      next: (data) => this.cajas = data,
      error: () => this.error = 'Error al cargar cajas'
    });
  }

  cargarMovimientos(): void {
    this.http.get<any[]>('/api/movimientos', { headers: this.getHeaders() }).subscribe({
      next: (data) => this.movimientos = data,
      error: () => this.error = 'Error al cargar movimientos'
    });
  }

  onCajaChange(): void {
    if (this.cajaId) {
      this.cajaError = '';
      this.http.get<any[]>(`/api/movimientos/caja/${this.cajaId}`,
        { headers: this.getHeaders() }).subscribe({
        next: (data) => this.movimientos = data,
        error: () => this.error = 'Error al cargar movimientos'
      });
    }
  }

  validarMonto(): void {
    if (!this.monto || this.monto <= 0) {
      this.montoError = 'Ingresa un monto válido mayor a 0';
    } else {
      this.montoError = '';
    }
  }

  validarDescripcion(): void {
    if (!this.descripcion.trim()) {
      this.descripcionError = 'La descripción es obligatoria';
    } else if (this.descripcion.length < 3) {
      this.descripcionError = 'Mínimo 3 caracteres';
    } else {
      this.descripcionError = '';
    }
  }

  validarCaja(): void {
    if (!this.cajaId) {
      this.cajaError = 'Selecciona una caja';
    } else {
      this.cajaError = '';
    }
  }

  registrar(): void {
    this.validarCaja();
    this.validarMonto();
    this.validarDescripcion();

    if (this.cajaError || this.montoError || this.descripcionError) return;

    this.cargando = true;
    this.error = '';
    this.exito = '';

    const url = `/api/movimientos?cajaId=${this.cajaId}&tipo=${this.tipo}&monto=${this.monto}&descripcion=${this.descripcion}`;

    this.http.post(url, {}, { headers: this.getHeaders() }).subscribe({
      next: () => {
        this.exito = `${this.tipo} registrado correctamente`;
        this.monto = null;
        this.descripcion = '';
        this.cargando = false;
        this.onCajaChange();
        this.cargarCajas();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar movimiento';
        this.cargando = false;
      }
    });
  }

  irADashboard(): void {
    this.router.navigate(['/caja']);
  }
}