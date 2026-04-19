import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'exercises',
    loadComponent: () => import('./exercises/exercises.page').then( m => m.ExercisesPage)
  },
  {
    path: 'log-workout',
    loadComponent: () => import('./log-workout/log-workout.page').then( m => m.LogWorkoutPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
];
