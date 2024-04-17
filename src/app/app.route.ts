import { NgModule } from '@angular/core';
import { Route } from '@angular/router';

export const APP_Route: Route[] = [
  {
    path: 'users-list',
    loadComponent: () => import('./components/user-list/user-list.component').then((x) => x.UserListComponent)
  },
  {
    path: '',
    redirectTo: 'users-list', pathMatch: 'prefix'
  }

];


