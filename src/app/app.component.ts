import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];

  constructor(private accountService: AccountService) { }

  public ngOnInit(): void {
    this.refreshUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private refreshUser(): void {
    const jwt = this.accountService.getJwt();
    if (jwt) {
      this.subscriptions.push(
        this.accountService.refreshUser(jwt).subscribe({
          next: _ => { },
          error: _ => {
            this.accountService.logout();
          }
        })
      )
    }
    else {
      this.subscriptions.push(
        this.accountService.refreshUser(null).subscribe()
      )
    }
  }
}
