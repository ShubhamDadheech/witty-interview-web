import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  addForm: FormGroup;
  user: any;

  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService, ) {
  }

  loadForm() {
    this.addForm = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNum: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')
      ])],
      // password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadForm();
    let userEmail = sessionStorage.getItem('email');
    this.httpService.callApi('getLogedinUserByEmail', { pathVariable: userEmail }).subscribe((response) => {
      this.user = response;

      this.setFormData(response);
    }, error => {

    })

  }

  setFormData(data) {
    if (data) {
      let formData = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNum: data.mobileNum,
        gender: data.gender,
        email: data.email,
      }
      this.addForm.patchValue(formData);
    }
  }

  updateUser() {
    let body = this.prepaerJSONData();

    this.httpService.callApi('updateUserProfile', { body: body }).subscribe((response) => {

      this.toastr.success("Successfully updated your profile");
    }, error => {
      this.toastr.error(error.error.message);
    })

  }


  prepaerJSONData() {
    let data = this.addForm.getRawValue();


    if (data.id) {
      // id: data.id

    }

    let json = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNum: data.mobileNum,
      gender: data.gender,
      email: data.email,
      // password: data.password,
    }
    return json;
  }

  changeFirstLetterCapital(controlerName) {
    let name = this.addForm.get(controlerName).value;
    name = name.charAt(0).charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    this.addForm.get(controlerName).setValue(name);
  }
}
