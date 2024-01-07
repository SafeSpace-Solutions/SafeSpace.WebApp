import { Component, Input } from '@angular/core';
import { INavbarItem } from './dashboard-nav-bar..interfaces';

@Component({
  selector: 'dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: ['./dashboard-nav-bar.component.scss']
})
export class DashboardNavBarComponent {

  @Input() public navbarItems!: Array<INavbarItem>;
}
