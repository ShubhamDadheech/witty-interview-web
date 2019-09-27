import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;
  constructor(private fb: FormBuilder, private httpService: HttpService, private toastr: ToastrService, private router: Router) { }


  ngOnInit() {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
  }


  login() {
    let emailId = this.loginForm.get('email').value;
    this.httpService.callApi('forgetPassword', { pathVariable: emailId, responseType: 'text' }).subscribe((response) => {
      console.log("response ==> " + response);
      this.toastr.success(response);
      this.router.navigate(['auth/signin']);

    }, error => {
      console.log(error);
      this.toastr.error(error.error.message);
    })
  }

  validateEmail() {

    if (this.loginForm.get('email').hasError('pattern')) {
      this.showError = true;
    } else {
      this.showError = false;
    }

  }


  removeError() {
    this.showError = false;
  }

}
