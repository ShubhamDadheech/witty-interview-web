import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CheckCandidateComponent } from './check-candidate/check-candidate.component';
import { DoneInterviewComponent } from './done-interview/done-interview.component';
import { DefaultComponent } from './default/default.component';
import { AuthSigninComponent } from './authentication/auth-signin/auth-signin.component';
import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateUserComponent } from './create-user/create-user.component';


const routes: Routes = [

  {
    path: 'witty',
    component: AdminComponent,
    children: [
      {
        path: 'candidate',
        component: CandidateComponent
       } ,
      {
        path: 'add-candidate',
        component:AddCandidateComponent
      },
      {
        path: 'candidate/:id',
        component:AddCandidateComponent
      },
      {
        path: 'check-candidate',
        component:CheckCandidateComponent
      },
      {
        path: 'done-interview',
        component:DoneInterviewComponent
      },
      {
        path: 'dashboard',
        component:DefaultComponent
      },
      {
        path: 'dashboard-graph',
        component:DashboardGraphComponent
      },
      {
        path: '',
        component:CandidateComponent
      },
      {
        path: 'user-profile',
        component:UserProfileComponent
      },
      {
        path: 'create-user',
        component:CreateUserComponent
      }
    ]
  },


  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
        
      },
      {
        path: '',
        // component:AuthSigninComponent
        loadChildren: './authentication/authentication.module#AuthenticationModule'
        
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




























