import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadChildren: './auth-signup/auth-signup.module#AuthSignupModule'
      },
      {
        path: 'signin',
        loadChildren: './auth-signin/auth-signin.module#AuthSigninModule'
      },
      {
        path: '',
        loadChildren: './auth-signin/auth-signin.module#AuthSigninModule'
      },
      {
        path: 'forget-password',
        component:ForgetPasswordComponent
      },
      {
        path: 'reset-password',
        component:ResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
