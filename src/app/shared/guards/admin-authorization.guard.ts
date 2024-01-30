import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from 'src/app/account/account.service';
import { User } from '../interfaces/common.interfaces';
import { map } from 'rxjs';
import { UserRoles } from '../enums/common.enums';
import { TOAST_MESSAGE_CONSTANTS } from '../constants/common.constants';

export const adminAuthorizationGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router)
  const toast = inject(NgToastService)
  return accountService.user$.pipe(
    map((user: User | null) => {
      if(user){
        if (user?.role === UserRoles.Admin) {
          return true;
        } else {
          return false;
        }
      }
      toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.NOT_AUTHORISED);
      router.navigate(['account/login']);
      return false
    })
  );
};
