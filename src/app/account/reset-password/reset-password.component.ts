import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/shared/interfaces/common.interfaces';
import { ResetPasswordModel } from '../account.interfaces';
import { NgToastService } from 'ng-angular-popup';
import { TOAST_MESSAGE_CONSTANTS } from 'src/app/shared/constants/common.constants';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: FormGroup = new FormGroup({});
  public token!: string;
  public email!: string;
  public submitted = false;
  public inputType: string = 'password';
  public isText: boolean = false;
  public eyeIcon: string = 'bi-eye-slash';
  public loader = false;

  private subscriptions: Array<Subscription> = [];

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user: User | null) => {
          this.subscriptions.push(
            this.activatedRoute.queryParamMap.subscribe({
              next: (params: any) => {
                this.token = params.get('token');
                this.email = params.get('email');

                if (this.token && this.email) {
                  this.initializeForm(this.email);
                } else {
                  this.router.navigateByUrl('/account/login');
                }
              }
            })
          )
        }
      })
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public resetPassword(): void {
    this.submitted = true;
    if (this.resetPasswordForm.valid && this.email && this.token) {
      this.loader = true;
      const model: ResetPasswordModel = {
        token: this.token,
        email: this.email,
        newPassword: this.resetPasswordForm.get('newPassword')?.value
      };
      this.subscriptions.push(
        this.accountService.resetPassword(model).subscribe({
          next: () => {
            this.toast.success(TOAST_MESSAGE_CONSTANTS.SUCCESS.PASSWORD_RESET_SUCCESS);
            this.router.navigateByUrl('/account/login');
          }, error: () => {
            this.loader = false;
            this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.PASSWORD_RESET_ERROR)
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

  private initializeForm(username: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [{ value: username, disabled: true }],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }
}
