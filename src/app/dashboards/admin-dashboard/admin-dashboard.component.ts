import { Component } from '@angular/core';
import { INavbarItem } from '../shared/dashboard-nav-bar/dashboard-nav-bar..interfaces';
import { ADMIN_NAVBAR_ITEMS } from './admin-dashboard.constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  public adminNavBarItems: Array<INavbarItem> = ADMIN_NAVBAR_ITEMS;
}
