import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserGender, UserRoles } from 'src/app/shared/enums/common.enums';
import { NgToastService } from 'ng-angular-popup';
import { MESSAGE_CONSTANTS, TOAST_MESSAGE_CONSTANTS } from 'src/app/shared/constants/common.constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {


  public registerForm: FormGroup = new FormGroup({});
  public submitted = false;
  public userGenders = [UserGender.Male, UserGender.Female, UserGender.Other];
  public userRole = UserRoles.Seeker;
  public inputType: string = 'password';
  public isText: boolean = false;
  public eyeIcon: string = 'bi-eye-slash';
  public loader = false;

  private subscriptions: Array<Subscription> = [];


  constructor(private accountService: AccountService,
     private formBuilder: FormBuilder,
     private toast: NgToastService,
     private router: Router) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public register(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loader = true;
      this.subscriptions.push(
        this.accountService.register(this.registerForm.value).subscribe({
          next: () => {
            this.toast.success(TOAST_MESSAGE_CONSTANTS.SUCCESS.ACCOUNT_REGISTERED);
            this.router.navigateByUrl('/account/login');
          },
          error: (error) => {
            this.loader = false;
            if (error.error === MESSAGE_CONSTANTS.ERRORS.EMAIL_EXISTS) {
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.EMAIL_EXISTS);
            }
            else {
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.SERVER_ERROR);
            }
          }
        })
      )
    }
  }

  public togglePasswordVisibility(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'bi-eye' : this.eyeIcon = 'bi-eye-slash';
    this.isText ? this.inputType = 'text' : this.inputType = 'password';
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: [null, Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.pattern('^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      role: [this.userRole, Validators.required]
    });
  }
}
