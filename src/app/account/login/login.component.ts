import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AccountService } from '../account.service';
import { Subscription } from 'rxjs';
import { MESSAGE_CONSTANTS, TOAST_MESSAGE_CONSTANTS } from 'src/app/shared/constants/common.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  inputType: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'bi-eye-slash';

  private subscriptions: Array<Subscription> = [];

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private toast: NgToastService, private router: Router) { }
  
  public ngOnInit(): void {
    this.initializeForm();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public login(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.subscriptions.push(
        this.accountService.login(this.loginForm.value).subscribe({
          next: (response) =>{
            console.log(response);
            this.toast.success(TOAST_MESSAGE_CONSTANTS.SUCCESS.LOGGED_IN);
            this.router.navigateByUrl('/dashboard');
          },
          error: (error) =>{
            if(error.error === MESSAGE_CONSTANTS.ERRORS.INVALID_CREDENTIALS){
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.INVALID_CREDENTIALS);
            }
            else{
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.SERVER_ERROR);
            }
          }
        })
      )
    }
  }

  public togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'bi-eye' : this.eyeIcon = 'bi-eye-slash';
    this.isText ? this.inputType = 'text' : this.inputType = 'password';
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
