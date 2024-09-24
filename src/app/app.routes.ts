import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboards/dashboardUsers/dashboard.component';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { LoginRedirectGuard } from './login-redirect-guard';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimalModelDashboardComponent } from './dashboards/dashboardAnimalModel/animal-model-dashboard/animal-model-dashboard.component';
import { AnchorPointDashboardComponent } from './dashboards/dashboardAnchorpoints/anchor-point-dashboard/anchor-point-dashboard.component';
import { UserInteractionDashboardComponent } from './dashboards/dashboardUserInteraction/user-interaction-dashboard/user-interaction-dashboard.component';

export const routes: Routes = [
  { path: 'user-dashboard', component: DashboardComponent },
  { path: 'animal-model-dashboard', component: AnimalModelDashboardComponent },
  { path: 'anchor-point-dashboard', component: AnchorPointDashboardComponent },
  { path: 'user-interaction-dashboard', component: UserInteractionDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirecciona a login por defecto
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'dashboard', component: AppComponent, canActivate: [AuthGuard] },  // Ruta para el componente del dashboard protegido por AuthGuard
  { path: '**', redirectTo: 'login' }
    // Redirecciona cualquier ruta no encontrada al login
];
