import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeekerDashboardComponent } from './seeker-dashboard.component';
import { HomePageComponent } from '../shared/home-page/home-page.component';
import { ChatComponent } from '../shared/chat/chat.component';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { SeekerAppointmentsComponent } from './seeker-appointments/seeker-appointments.component';

const routes: Routes = [
  {
    path: '',
    component: SeekerDashboardComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'my-appointments', component: SeekerAppointmentsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeekerDashboardRoutingModule { }
