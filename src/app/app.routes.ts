import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './protected/pages/menu/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import {ListEmployeComponent} from './protected/pages/menu/recrutement/list-employe/list-employe.component';
import {ParametresComponent} from './protected/pages/menu/parametres/parametres/parametres.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défaut
      { path: 'home', component: DashboardComponent }, // Page d'accueil du dashboard
      // { path: 'list-employe', component: ListEmployeComponent }, // À ajouter selon tes besoins
    ]
  },
  {
    path: 'list-employe',
    component: ListEmployeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parametres',
    component: ParametresComponent,
    canActivate: [AuthGuard]
  }
];
