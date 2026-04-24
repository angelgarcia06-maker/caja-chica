import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  guardarRol(rol: string): void {
    localStorage.setItem('rol', rol);
  }

  guardarUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  obtenerUsername(): string | null {
    return localStorage.getItem('username');
  }

  esAdmin(): boolean {
    const rol = this.obtenerRol();
    return rol === 'ADMIN' || rol === 'ROLE_ADMIN';
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }

  obtenerUsernameDelToken(): string {
  const token = this.obtenerToken();
  if (!token) return '';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';
  } catch {
    return '';
  }
}
obtenerRolDesdeApi(http: any): void {
  const token = this.obtenerToken();
  const username = this.obtenerUsername();
  if (!token || !username) return;

  const headers = { 'Authorization': `Bearer ${token}` };
  http.get('/api/usuarios', { headers }).subscribe({
    next: (usuarios: any[]) => {
      const usuario = usuarios.find((u: any) => u.username === username);
      if (usuario) {
        this.guardarRol(usuario.rol);
      }
    }
  });
}
}