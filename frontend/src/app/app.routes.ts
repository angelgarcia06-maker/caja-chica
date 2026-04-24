import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { CajaChicaComponent } from './caja/caja-chica/caja-chica';
import { RegistroComponent } from './usuarios/registro/registro';
import { ListaComponent } from './usuarios/lista/lista';
import { MovimientoComponent } from './movimientos/movimiento/movimiento';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'caja', component: CajaChicaComponent, canActivate: [authGuard] },
  { path: 'usuarios/registro', component: RegistroComponent, canActivate: [authGuard] },
  { path: 'usuarios/lista', component: ListaComponent, canActivate: [authGuard] },
  { path: 'movimientos', component: MovimientoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];