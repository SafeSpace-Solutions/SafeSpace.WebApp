import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from './account.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public register(model: RegisterModel){
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }
}
