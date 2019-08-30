import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  private loginSubscription: Subscription;
  public errorMessage: string;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('Inside login');

    if (sessionStorage.getItem('token')) {
      sessionStorage.clear();
    }
    const formValue = this.loginForm.value;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', "password");
    urlSearchParams.append('username', formValue.email);
    urlSearchParams.append('password', formValue.password);
    let body = urlSearchParams.toString()
    console.log('body: '+body);
    var headers = new HttpHeaders({ 'Authorization': 'Basic ' + 'd2l0dHktd2ViLWNsaWVudDoxMjM0NTY3ODkw', 'Content-Type': 'application/x-www-form-urlencoded', 'UUID': '1234567890' });
    this.httpService.callApi('login', { body, headers }).subscribe(
      (response) => {
        if (response['access_token']) {
           let userEmail = this.loginForm.get('email').value;
          sessionStorage.setItem('token', response['access_token']);
          sessionStorage.setItem('email', userEmail);
          console.log("email ===> "+this.loginForm.get('email'));
          
          this.goDashboard();
  
        }
      },
      error => {
        console.log('Error  login => ', error)
        this.errorMessage = error.error.error_description;
      }
    );

  }


  goDashboard() {
    this.router.navigate(['add-candidate']);
  }
}
