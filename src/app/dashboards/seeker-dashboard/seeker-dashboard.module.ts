import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeekerDashboardRoutingModule } from './seeker-dashboard-routing.module';
import { SeekerDashboardComponent } from './seeker-dashboard.component';
import { DashboardSharedModule } from '../shared/dashboard-shared.module';
import { SeekerAppointmentsComponent } from './seeker-appointments/seeker-appointments.component';


@NgModule({
  declarations: [
    SeekerDashboardComponent,
    SeekerAppointmentsComponent
  ],
  imports: [
    CommonModule,
    SeekerDashboardRoutingModule,
    DashboardSharedModule
  ]
})
export class SeekerDashboardModule { }
