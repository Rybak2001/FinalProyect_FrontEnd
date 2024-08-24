import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { LoginRedirectGuard } from './login-redirect-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirecciona a login por defecto
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Ruta para el componente del dashboard protegido por AuthGuard
  { path: '**', redirectTo: 'login' }  // Redirecciona cualquier ruta no encontrada al login
];
