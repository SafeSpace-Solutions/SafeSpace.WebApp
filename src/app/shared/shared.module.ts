import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgToastModule
  ],
  exports: [
    NgToastModule
  ]
})
export class SharedModule { }
