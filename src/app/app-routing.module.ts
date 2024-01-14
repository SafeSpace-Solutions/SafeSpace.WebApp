import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizationGuard } from './shared/guards/authorization.guard';
import { unauthorizationGuard } from './shared/guards/unauthorization.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule),
    canActivate: [unauthorizationGuard]
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/seeker-dashboard/seeker-dashboard.module').then(m => m.SeekerDashboardModule),
    canActivate: [authorizationGuard]
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
