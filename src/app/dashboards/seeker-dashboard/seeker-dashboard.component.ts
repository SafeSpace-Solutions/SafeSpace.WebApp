import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SEEKER_NAVBAR_ITEMS } from './seeker-dashboard.constants';
import { INavbarItem } from '../shared/dashboard-nav-bar/dashboard-nav-bar..interfaces';

@Component({
  selector: 'seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.scss']
})
export class SeekerDashboardComponent {

  public seekerNavBarItems: Array<INavbarItem> = SEEKER_NAVBAR_ITEMS;
  constructor(private router: Router, private location: Location) { }

  public ngOnInit(): void {
    
  }
}

