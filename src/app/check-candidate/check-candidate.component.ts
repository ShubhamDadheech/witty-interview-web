import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-check-candidate',
  templateUrl: './check-candidate.component.html',
  styleUrls: ['./check-candidate.component.scss']
})
export class CheckCandidateComponent implements OnInit {
  checkCandidateForm: FormGroup;
  notFocused = false;
  candidateDetail;
  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.checkCandidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      pMobile: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onKeyPress(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  searchCnadidate() {

    this.candidateDetail=new HttpParams()
    .set('firstName',this.checkCandidateForm.get("firstName").value)
    .set('lastName',this.checkCandidateForm.get("lastName").value)
    .set('fatherName',this.checkCandidateForm.get("fatherName").value)
    .set('primaryMobileNo',this.checkCandidateForm.get("pMobile").value)
    .set('email',this.checkCandidateForm.get("email").value);

    // localhost:9093/candidate/search?email=sumit123@gmail.com&primaryMobileNo=9897867767&firstName=sumit&lastName=yadav&fatherName=vinay yadav

    // http://192.168.1.37:9093/candidate/search?firstName=sumit&lastName=yadav&fatherName=vinay%20yadav&primaryMobileNo=9897867767&email=sumit123@gmail.com

    this.httpService.callApi('checkCandidate', {params:this.candidateDetail}).subscribe((response => {
      console.log(response);
      // this.candidates = response;
      // console.log(this.candidates.length)
    }), (error) => {
      // this.toastr.error(error.error.message, 'Personnel');
      console.log(error);
    })
  }
}
