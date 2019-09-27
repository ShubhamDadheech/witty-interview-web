import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { moment } from 'fullcalendar';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-done-interview',
  templateUrl: './done-interview.component.html',
  styleUrls: ['./done-interview.component.scss']
})
export class DoneInterviewComponent implements OnInit {

  dateForm: FormGroup;
  candidates: any = [];
  searchText;
  timePeriod;
  todayDate;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { 
    this.todayDate = new Date();
  }

  ngOnInit() {
    
    this.lodaDataForm();

    this.timePeriod = new HttpParams()
    .set('startDate', moment(this.todayDate).tz("Asia/Calcutta").format("YYYY-MM-DD"))
    .set('endDate', moment(this.todayDate).tz("Asia/Calcutta").format("YYYY-MM-DD"));

  this.httpService.callApi('doneInterviewBetweenTwoDate', { params: this.timePeriod }).subscribe((response => {

    this.candidates = response;
  }), (error) => {
  
  })

  }




  apply() {
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"));

    this.httpService.callApi('doneInterviewBetweenTwoDate', { params: this.timePeriod }).subscribe((response => {
      this.candidates = response;
    }), (error) => {
      
    })

  }

 


  openCandidate(id: string) {
    this.router.navigate(['witty/candidate', id]);

  }

  lodaDataForm() {
    this.dateForm = this.fb.group({
      from: [this.todayDate],
      to: [this.todayDate]
    });
  }


}
