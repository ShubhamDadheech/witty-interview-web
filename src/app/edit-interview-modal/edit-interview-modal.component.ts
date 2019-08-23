import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-edit-interview-modal',
  templateUrl: './edit-interview-modal.component.html',
  styleUrls: ['./edit-interview-modal.component.scss']
})
export class EditInterviewModalComponent implements OnInit {
  @Input() editModalData: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  editInterviewForm: FormGroup;
  showJoinDate: boolean = false;
  showNextRoundDate: boolean = false;
  round: any;
  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService) {


  }

  ngOnInit() {

    this.loadForm();

    if (this.editModalData) {

      this.httpService.callApi('getInterviewById', { pathVariable: this.editModalData }).subscribe((response) => {
        console.log('response ==> ' + JSON.stringify(response));
        // this.addForm.get('interview').setValue(null);
        this.setValue(response);
        this.round = response.roundNo;
        console.log('response.roundNo ==> ' + response.roundNo);

      }, error => {

      })
    }
  }


  loadForm() {
    this.editInterviewForm = this.fb.group({
      profile: ['', Validators.required],
      interviewer: ['', Validators.required],
      reference: ['', Validators.required],
      joining: [],
      feedback: ['', Validators.required],
      result: ['', Validators.required],
      interviewDate: ['', Validators.required],
      nextRoundDate: [],
      interviewId: [],
      round: [],
    });
  }

  saveInterview() {

    let body = this.prepareJson();

    this.httpService.callApi('SaveOrUpdateInterview', { body: body }).subscribe((response) => {
      console.log('response ==> ' +JSON.stringify(response) );
      this.closeModalEvent.emit(false);
    }, error => {

    })


    console.log('hum');
   
  }


  prepareJson() {

    let data = this.editInterviewForm.getRawValue();
    let nextRoundDate;
    let nextRoundDateArray;
    if (data.nextRoundDate) {
      nextRoundDate = moment.tz(new Date(data.nextRoundDate), "Asia/Calcutta").format();
      nextRoundDateArray = nextRoundDate.split('+');
      // console.log(" check date ==> "+nextRoundDateArray[0]+".173");
    }
    let jsonData = {

      round: this.round,
      joiningDate: data.joining == null ? null : moment.tz(new Date(data.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
      selected: data.result,
      roundDate: data.interviewDate == null ? null : moment.tz(new Date(data.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
      interviewedBy: data.interviewer,
      description: data.feedback,
      nextRoundScheduleOn: data.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
      profile: data.profile,
      referedBy: data.reference,
      id: this.editModalData,
    }
    console.log('jsonDATA ==>  ' + JSON.stringify(jsonData));

    return jsonData;
  }

  changeAction(event) {
    if (event === "null") {
      this.showNextRoundDate = true;
      this.showJoinDate = false;

      // this.addForm.get('attachment').get('url').clearValidators();
      this.editInterviewForm.get('nextRoundDate').setValidators(Validators.required);
      this.editInterviewForm.get('joining').setValue(null);
    } else if (event === "true") {
      this.showJoinDate = true;
      this.showNextRoundDate = false;
      this.editInterviewForm.get('joining').setValidators(Validators.required);
      this.editInterviewForm.get('nextRoundDate').setValue(null);
    } else {
      this.showNextRoundDate = false;
      this.showJoinDate = false;
      this.editInterviewForm.get('nextRoundDate').clearValidators();
      this.editInterviewForm.get('joining').clearValidators();
      this.editInterviewForm.get('nextRoundDate').setValue(null);
      this.editInterviewForm.get('joining').setValue(null);
    }
  }

  setValue(value) {

    if (value.nextRoundScheduleOn) {
      this.changeAction('null');
    } else if (value.joiningDate) {
      this.changeAction('true');
    }

    let arrayData = {

      round: value.round ? value.round : null,
      joining: value.joiningDate ? moment.tz(new Date(value.joiningDate), "Asia/Calcutta").toDate() : null,
      result: value.selected == null ? "null" : value.selected == true ? "true" : "false",
      interviewDate: value.roundDate ? moment.tz(new Date(value.roundDate), "Asia/Calcutta").toDate() : null,
      interviewer: value.interviewedBy,
      feedback: value.description,
      nextRoundDate: value.nextRoundScheduleOn ? moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").toDate() : null,
      profile: value.profile,
      reference: value.referedBy ? value.referedBy : null,
      interviewId: value.id,
    }
    this.editInterviewForm.patchValue(arrayData);
  }
}
