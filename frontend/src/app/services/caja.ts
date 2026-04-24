import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = '/api/caja';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.obtenerToken()}`
    });
  }

  crearCaja(montoInicial: number): Observable<any> {
    return this.http.post(`${this.apiUrl}?montoInicial=${montoInicial}`, {}, 
      { headers: this.getHeaders() });
  }

  listarCajas(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
}