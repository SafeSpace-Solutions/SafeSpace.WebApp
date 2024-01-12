import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/seeker-dashboard/seeker-dashboard.module').then(m => m.SeekerDashboardModule)
  },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
