import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { User } from '../interfaces/common.interfaces';
import { Observable, map } from 'rxjs';
import { UserRoles } from '../enums/common.enums';
import { NgToastService } from 'ng-angular-popup';
import { TOAST_MESSAGE_CONSTANTS } from 'src/app/shared/constants/common.constants';

export const seekerAuthorizationGuard: CanActivateFn = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const router = inject(Router)
  const toast = inject(NgToastService)
  return accountService.user$.pipe(
    map((user: User | null) => {
      if (user?.role === UserRoles.Seeker) {
        return true;
      } else {
        toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.NOT_AUTHORISED);
        router.navigate(['account/login']);
        return false;
      }
    })
  );
};
