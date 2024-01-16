import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MESSAGE_CONSTANTS, TOAST_MESSAGE_CONSTANTS } from 'src/app/shared/constants/common.constants';

@Component({
  selector: 'send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit, OnDestroy {

  public sendEmailForm: FormGroup = new FormGroup({});
  public submitted = false;
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

  public sendEmail(): void {
    if (this.sendEmailForm.valid) {
      this.loader = true;
      this.subscriptions.push(
        this.accountService.forgotPassword(this.sendEmailForm.get('email')?.value).subscribe({
          next: () => {
            this.toast.success(TOAST_MESSAGE_CONSTANTS.SUCCESS.PASSWORD_RESET_EMAIL_SENT);
            this.router.navigateByUrl('/account/login');
          },
          error: (error) => {
            this.loader = false;
            if (error.error === MESSAGE_CONSTANTS.ERRORS.EMAIL_DOES_NOT_EXIST) {
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.EMAIL_DOES_NOT_EXIST);
            }
            else {
              this.toast.error(TOAST_MESSAGE_CONSTANTS.ERRORS.SERVER_ERROR);
            }
          }
        })
      )
    }
    this.submitted = true;
  }

  private initializeForm(): void {
    this.sendEmailForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }
}
