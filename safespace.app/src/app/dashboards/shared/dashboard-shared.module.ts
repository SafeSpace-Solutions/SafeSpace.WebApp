import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavBarComponent } from './dashboard-nav-bar/dashboard-nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    DashboardNavBarComponent,
    HomePageComponent,
    ChatComponent,
    UserProfileComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [ DashboardNavBarComponent, HomePageComponent ]
})
export class DashboardSharedModule { }
