import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'diary',
    loadComponent: () => import('./features/diary/tb100.component').then(mod => mod.Tb100Component),
    canActivate: [AuthGuard]
  },
];
