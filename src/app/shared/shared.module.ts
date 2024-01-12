import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Router, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { PasswordVisibilityPipe } from './pipes/password-visibility.pipe';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [
    ValidationMessagesComponent,
    NotFoundComponent,
    PasswordVisibilityPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgToastModule
  ],
  exports: [
    ValidationMessagesComponent,
    NotFoundComponent,
    PasswordVisibilityPipe,
    NgToastModule
  ]
})
export class SharedModule { }
