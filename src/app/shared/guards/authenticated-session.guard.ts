import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AccountService } from "src/app/account/account.service";
import { User } from "../interfaces/common.interfaces";
import { Observable, map } from "rxjs";

export const authenticatedSessionGuard
: CanActivateFn = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  return accountService.user$.pipe(
    map((user: User | null) => {
      if (user) {
        router.navigate(['dashboard/home']);
        return false;
      } else {
        return true;
      }
    })
  );
};
