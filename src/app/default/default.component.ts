import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { moment } from 'fullcalendar';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  dateForm: FormGroup;
  candidates: any = [];
  searchText;
  timePeriod;
  todayDate;
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { 
    this.todayDate = new Date();
  }

  ngOnInit() {
  
    
    // this.allCandidates();
    this.lodaDataForm();
    this. apply();
  }




  apply() {
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"));

    this.httpService.callApi('interviewBetweenTwoDate', { params: this.timePeriod }).subscribe((response => {
      this.candidates = response;
    }), (error) => {
    })

  }

  todayInterview() {
    this.httpService.callApi('todayInterview', {}).subscribe((response => {
      this.candidates = response;
     }), (error) => {

    })
  }

  allCandidates() {
    this.httpService.callApi('getCandidates', {}).subscribe((response => {
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
