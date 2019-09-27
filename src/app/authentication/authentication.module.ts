import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgetPasswordComponent, ResetPasswordComponent]
})
export class AuthenticationModule { }
