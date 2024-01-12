import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/interfaces/common.interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  public user!: User;
  private subscriptions: Array<Subscription> = [];

  constructor(private accountService: AccountService,private router: Router) { }
  ngOnInit(): void {
    this.subscriptions.push(
      this.accountService.user$.subscribe((user) => {
        if(user){
          this.user = user;
        }
      })
    )
  }
  public logout(): void {
    this.router.navigateByUrl('/account/login');
  }
}
