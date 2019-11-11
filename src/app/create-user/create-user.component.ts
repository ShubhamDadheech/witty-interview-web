import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {



  addForm: FormGroup;
  user: any;
  roles: SelectItem[];
  roleData: any;
  candidates: any;
  // showCreateUser:boolean = true;
  notFocusedmobileNum = false;
  loadder: boolean = false;
  userAdmin: boolean = false;
  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService, ) {
    this.userAdmin = sessionStorage.getItem('admin') === "true" ? true : false;
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
      admin: []
    });
  }

  ngOnInit() {
    this.loadForm();
    this.getAllUser();


  }

  setFormData(data) {
    if (data) {
      console.log(" data.admin ==> "+ data.admin);
      
      let formData = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNum: data.mobileNum,
        gender: data.gender,
        email: data.email,
        admin: data.admin
      }
      this.addForm.patchValue(formData);
    }
  }

  saveUser() {
    let body = this.prepaerJSONData();
    this.loadder = true
    this.httpService.callApi('updateUserProfile', { body: body }).subscribe((response) => {
      this.ngOnInit();
      this.loadder = false;
      this.toastr.success("Successfully save profile");
    }, error => {
      this.loadder = false;
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
      active: true,
      admin:data.admin
      // password: data.password,
    }
    return json;
  }

  changeFirstLetterCapital(controlerName) {
    let name = this.addForm.get(controlerName).value;
    name = name.charAt(0).charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    this.addForm.get(controlerName).setValue(name);
  }


  disableUser(data, status) {

    if (confirm("Are you sure to change action ")) {
      let timePeriod = new HttpParams()
        .set('id', data.id)
        .set('status', status);

      this.httpService.callApi('disableUser', { params: timePeriod }).subscribe((response) => {
        // this.candidates = response;
        // this.toastr.success("Successfully");
        this.getAllUser();
      }, error => {
        this.toastr.error(error.error.message);
      })
    }
  }

  getAllUser() {
    this.httpService.callApi('getAllUser', {}).subscribe((response) => {
      this.candidates = response;
      // this.toastr.success("Successfully");
    }, error => {
      this.toastr.error(error.error.message);
    })
  }

  onKeyPress(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  editUser(data) {
    this.setFormData(data);
  }
  //   menuClick(){
  // this.showCreateUser=false;
  //   }
}
