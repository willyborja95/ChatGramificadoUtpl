import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { UiRoutingModule } from './ui-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { GlosarioComponent } from '../glosario/glosario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    GlosarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UiRoutingModule),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],exports:[
    MaterialModule
  ]
})
export class UiModule { }
