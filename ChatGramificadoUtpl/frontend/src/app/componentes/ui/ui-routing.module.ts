import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlosarioComponent } from '../glosario/glosario.component';
import { AuthGuard } from '../../guards/auth.guard';

export const UiRoutingModule: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'glosario/:id',
    component: GlosarioComponent,
    // canActivate: [AuthGuard] 
  },
];

