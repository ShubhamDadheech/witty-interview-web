import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { HttpService } from 'src/app/service/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup;
  notMatch: boolean = false;
  userEmail: any;
  showSubmit: boolean = false;
  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private httpService: HttpService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loadLoginForm();
    this.userEmail = this.activeRoute.snapshot.queryParamMap.get('email');
    if(this.userEmail == null){
        this.toastr.error("Invalid Request URL")
    }
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  checkPassword() {
    let pass = this.loginForm.get('password').value;
    let confirmPass = this.loginForm.get('confirmPassword').value;

    // return pass === confirmPass ? null : { notSame: true }   
    if (confirmPass) {
      this.notMatch = pass === confirmPass ? false : true;
    }

  }

  validatePassword() {
    let pass = this.loginForm.get('password').value;
    let confirmPass = this.loginForm.get('confirmPassword').value;

    if (confirmPass != null) {
      this.notMatch = pass === confirmPass ? false : true;
    }

  }

  login() {

    let param = new HttpParams()
      .set('password', this.loginForm.get('password').value)
      .set('confirmPassword', this.loginForm.get('confirmPassword').value)
      .set('email', this.userEmail);


    this.httpService.callApi('resetPassword', { params: param, responseType: 'text' }).subscribe((response) => {
      this.toastr.success(response);
      this.router.navigate(['auth/signin']);

    }, error => {
      this.toastr.error(error.error.message);
    })

  }


  onSearchChange() {
    let pass = this.loginForm.get('password').value;
    let confirmPass = this.loginForm.get('confirmPassword').value;
    let email = this.userEmail;
    this.showSubmit = false; 
    if ((pass != null && confirmPass != null && email !=null) && pass === confirmPass) {
      this.showSubmit = true;
    }
    
  }


  removeError() {
    this.notMatch = false;
  }
}
