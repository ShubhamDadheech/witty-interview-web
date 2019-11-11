import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/service/error-message.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;
  loadder: boolean = false;
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private httpService: HttpService, private toastr: ToastrService, private router: Router, private errorMessageService:ErrorMessageService) { }


  ngOnInit() {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])]
    });
  }


  login() {
   if(this.loginForm.valid){
    this.loadder = true;
    let emailId = this.loginForm.get('email').value;
    this.httpService.callApi('forgetPassword', { pathVariable: emailId, responseType: 'text' }).subscribe((response) => {
      this.toastr.success(response);
      this.loadder = false;
      this.router.navigate(['auth/signin']);

    }, error => {
      if (error.status == 404) {
        this.toastr.error("User not found");
      } else {
        this.toastr.error(error.error.message);
      }
      this.loadder = false;
    })
   }else{
     this.submitted = true;
     return;
   }
  }



  homePage() {
    this.router.navigate(['auth/signin']);
  }

}
