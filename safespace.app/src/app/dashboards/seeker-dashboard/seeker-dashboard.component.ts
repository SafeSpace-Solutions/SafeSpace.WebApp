import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SEEKER_NAVBAR_ITEMS } from './seeker-dashboard.constants';
import { INavbarItem } from '../shared/dashboard-nav-bar/dashboard-nav-bar..interfaces';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.scss']
})
export class SeekerDashboardComponent {

  public seekerNavBarItems: Array<INavbarItem> = SEEKER_NAVBAR_ITEMS;
  constructor(private router: Router, private location: Location) { }

  public ngOnInit(): void {
    const currentPath = this.location.path();

    if (!currentPath || currentPath === '/') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate([currentPath]);
    }
  }
}

