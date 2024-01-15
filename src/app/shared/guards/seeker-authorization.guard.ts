import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { User } from '../interfaces/common.interfaces';
import { Observable, map } from 'rxjs';
import { UserRoles } from '../enums/common.enums';

export const seekerAuthorizationGuard: CanActivateFn = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const router = inject(Router)
  return accountService.user$.pipe(
    map((user: User | null) => {
      if (user?.role === UserRoles.Seeker) {
        return true;
      } else {
        router.navigate(['account/login']);
        return false;
      }
    })
  );
};
