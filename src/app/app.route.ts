import { NgModule } from '@angular/core';
import { Route } from '@angular/router';

export const APP_Route: Route[] = [
  {
    path: 'customers-list',
    loadComponent: () => import('./components/user-list/user-list.component').then((x) => x.UserListComponent)
  },
  {
    path: '',
    redirectTo: 'customers-list', pathMatch: 'prefix'
  },
  {
    path: 'customer-add',
    loadComponent:() => import('./components/user-add/user-add.component').then((x)=>x.UserAddComponent)
  }

];


