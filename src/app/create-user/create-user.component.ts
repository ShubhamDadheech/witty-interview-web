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
      roles: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.roles = [
      { label: 'Admin', value: 'Admin' },
      { label: 'HR', value: 'HR' },
      { label: 'User', value: 'User' },

    ];
    this.loadForm();
    this.getAllUser();



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
        roles: data.roles,
      }
      this.addForm.patchValue(formData);
    }
  }

  saveUser() {
    let body = this.prepaerJSONData();

    this.httpService.callApi('updateUserProfile', { body: body }).subscribe((response) => {
      this.ngOnInit();
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
      roles: this.roleData,
      active: true
      // password: data.password,
    }
    return json;
  }

  changeFirstLetterCapital(controlerName) {
    let name = this.addForm.get(controlerName).value;
    name = name.charAt(0).charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    this.addForm.get(controlerName).setValue(name);
  }

  changeRoleValue(event) {
    this.roleData = [];
    event.value.forEach(r => {
      let role = {
        roleName: r,
        active: true
      }
      this.roleData.push(role);
    })
    console.log("  event.value ==> " + event.value);
    console.log(" roleData ==> " + JSON.stringify(this.roleData));



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
  //   menuClick(){
  // this.showCreateUser=false;
  //   }
}
