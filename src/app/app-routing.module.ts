import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedSessionGuard } from './shared/guards/authenticated-session.guard';
import { seekerAuthorizationGuard } from './shared/guards/seeker-authorization.guard';
import { adminAuthorizationGuard } from './shared/guards/admin-authorization.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule),
    canActivate: [authenticatedSessionGuard]
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/seeker-dashboard/seeker-dashboard.module').then(m => m.SeekerDashboardModule),
    canMatch: [seekerAuthorizationGuard]
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canMatch: [adminAuthorizationGuard]
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' 
  },

  {
    path: '**',
    redirectTo: 'dashboard' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
