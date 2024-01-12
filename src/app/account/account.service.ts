import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from './account.interfaces';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/interfaces/common.interfaces';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private userSource = new ReplaySubject<User | null>(1);
  public user$ = this.userSource.asObservable();

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
