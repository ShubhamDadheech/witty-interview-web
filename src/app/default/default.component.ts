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

    console.log('from date ==> ' + this.dateForm.get('from').value);
    console.log('to date ==> ' + this.dateForm.get('to').value);
    this. apply();
  }




  apply() {
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"));

    this.httpService.callApi('interviewBetweenTwoDate', { params: this.timePeriod }).subscribe((response => {
      console.log(response);
      this.candidates = response;
      console.log(this.candidates.length)
    }), (error) => {
      console.log(error);
    })

  }

  todayInterview() {
    this.httpService.callApi('todayInterview', {}).subscribe((response => {
      console.log(response);
      this.candidates = response;
      console.log(this.candidates.length)
    }), (error) => {
      console.log(error);
    })
  }

  allCandidates() {
    this.httpService.callApi('getCandidates', {}).subscribe((response => {
      console.log(response);
      this.candidates = response;
      console.log(this.candidates.length)
    }), (error) => {
      // this.toastr.error(error.error.message, 'Personnel');
      console.log(error);
    })
  }

  openCandidate(id: string) {
    console.log('id==>' + id);
    this.router.navigate(['witty/candidate', id]);

  }

  lodaDataForm() {
    this.dateForm = this.fb.group({
      from: [this.todayDate],
      to: [this.todayDate]
    });
  }
}
