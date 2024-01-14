import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel, ResetPasswordModel as ResetPasswordModel } from './account.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/interfaces/common.interfaces';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private userSource = new ReplaySubject<User | null>(1);
  public user$ = this.userSource.asObservable();


  forgotPassword(email: string) {
    return this.http.post(`${environment.appUrl}/api/account/forgot-password/${email}`, {});
  }

  resetPassword(model: ResetPasswordModel) {
    return this.http.put(`${environment.appUrl}/api/account/reset-password`, model);
  }

  refreshUser(jwt: string|null) {
    if(jwt == null){
      this.userSource.next(null);
      return of(undefined)
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, {headers}).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }

  public login(model: LoginModel) {
    return this.http.post<User>(`${environment.appUrl}/api/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
          return user;
        }
        return null;
      })
    );
  }

  public logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/account/login');
  }

  public register(model: RegisterModel) {
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }

  getJwt(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user: User = JSON.parse(key);
      return user.jwt;
    }
    else
      return null;
  }

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
}
