import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CheckCandidateComponent } from './check-candidate/check-candidate.component';
import { DoneInterviewComponent } from './done-interview/done-interview.component';
import { DefaultComponent } from './default/default.component';


const routes: Routes = [

  {
    path: '',
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
        path: '',
        component:DefaultComponent
      }
    ]
  },
  // {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'dashboard',
  //       loadChildren: './demo/dashboard/dashboard.module#DashboardModule'
  //     },
  //     {
  //       path: 'basic',
  //       loadChildren: './demo/ui-elements/ui-basic/ui-basic.module#UiBasicModule'
  //     },
  //     {
  //       path: 'forms',
  //       loadChildren: './demo/pages/form-elements/form-elements.module#FormElementsModule'
  //     },
  //     {
  //       path: 'tables',
  //       loadChildren: './demo/pages/tables/tables.module#TablesModule'
  //     },
  //     {
  //       path: 'charts',
  //       loadChildren: './demo/pages/core-chart/core-chart.module#CoreChartModule'
  //     },
  //     {
  //       path: 'maps',
  //       loadChildren: './demo/pages/core-maps/core-maps.module#CoreMapsModule'
  //     },
  //     {
  //       path: 'sample-page',
  //       loadChildren: './demo/extra/sample-page/sample-page.module#SamplePageModule'
  //     }
  //   ]
  // },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
