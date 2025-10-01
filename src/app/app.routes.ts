import { Routes } from '@angular/router';

/**
 * Defines the routes for navigation within the application and lazy loads the components.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'weight-tracker',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
