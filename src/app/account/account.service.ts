import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel, ResetPasswordModel } from './account.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/interfaces/common.interfaces';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private userSource = new ReplaySubject<User | null>(1);
  public user$ = this.userSource.asObservable();

  public login(model: LoginModel): Observable<User | null> {
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

  public logout(): void {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/account/login');
  }

  public register(model: RegisterModel): Observable<object> {
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }
  public forgotPassword(email: string): Observable<object> {
    return this.http.post(`${environment.appUrl}/api/account/forgot-password/${email}`, {});
  }

  public resetPassword(model: ResetPasswordModel): Observable<object> {
    return this.http.put(`${environment.appUrl}/api/account/reset-password`, model);
  }

  public refreshUser(jwt: string | null): Observable<null | void> {
    if (jwt == null) {
      this.userSource.next(null);
      return of(null)
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, { headers }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }

  public getJwt(): string | null {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const jwt: string = JSON.parse(key);
      return jwt;
    }
    else
      return null;
  }

  private setUser(user: User): void {
    localStorage.setItem(environment.userKey, JSON.stringify(user.jwt));
    this.userSource.next(user);
  }
}
