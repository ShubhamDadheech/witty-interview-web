import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import {NavigationItem} from './theme/layout/admin/navigation/navigation';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import {ToggleFullScreenDirective} from './theme/shared/full-screen/toggle-full-screen';
import {NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';

import { CandidateComponent } from './candidate/candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CheckCandidateComponent } from './check-candidate/check-candidate.component';
import { DoneInterviewComponent } from './done-interview/done-interview.component';
import { DefaultComponent } from './default/default.component';
import { EditInterviewModalComponent } from './edit-interview-modal/edit-interview-modal.component';

import { FilterListPipePipe } from './pipe/filter-list-pipe.pipe';
import { FilterInterviewPipe} from './pipe/filter-interview.pipe';
import { TokenInterceptor } from './service/token-interceptor';





@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    ToggleFullScreenDirective,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    CandidateComponent,
    AddCandidateComponent,
    CheckCandidateComponent,
    DoneInterviewComponent,
    EditInterviewModalComponent,
    FilterListPipePipe,
    FilterInterviewPipe,
    DefaultComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    ToastrModule.forRoot()
    
  ],
  providers: [NavigationItem, {
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
