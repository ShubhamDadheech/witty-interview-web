import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  private loginSubscription: Subscription;
  public errorMessage: string;
  loginForm: FormGroup;
  submitted:boolean = false;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router, private dataService: DataService, private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }

    if (sessionStorage.getItem('token')) {
      sessionStorage.clear();
    }
    const formValue = this.loginForm.value;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', "password");
    urlSearchParams.append('username', formValue.email);
    urlSearchParams.append('password', formValue.password);
    let body = urlSearchParams.toString()
    var headers = new HttpHeaders({ 'Authorization': 'Basic ' + 'd2l0dHktd2ViLWNsaWVudDoxMjM0NTY3ODkw', 'Content-Type': 'application/x-www-form-urlencoded', 'UUID': '1234567890' });
    this.httpService.callApi('login', { body, headers }).subscribe(
      (response) => {
        if (response['access_token']) {
          let userEmail = this.loginForm.get('email').value;
          sessionStorage.setItem('token', response['access_token']);
          sessionStorage.setItem('email', userEmail);

          this.dataService.isLoggedIn = true;

          this.goDashboard();

        }
      },
      error => {
        this.errorMessage = error.error.error_description;
        if (error.error_description) {
          this.errorMessage = error.error_description;
        }
      }
    );

  }

  forgetPassword() {
    this.router.navigate(['forget-password']);
  }

  goDashboard() {
    this.router.navigate(['witty/candidate']);
  }
}

