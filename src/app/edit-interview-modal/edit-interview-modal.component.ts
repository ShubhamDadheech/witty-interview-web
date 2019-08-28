import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import * as moment from 'moment-timezone';
import { StatusDropdownDataService } from '../service/status-dropdown-data.service';

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
  statusDropdownData: any;
  showRoundDate = true;
  showScheduledDate = false;
  showInterviwer = true;
  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService, private StatusDropdownDataService: StatusDropdownDataService) {


  }

  ngOnInit() {

    this.loadForm();
    this.StatusDropdownDataService.getStatusDropdownData((data) => {
      this.statusDropdownData = data;
    })
    if (this.editModalData) {

      this.httpService.callApi('getInterviewById', { pathVariable: this.editModalData }).subscribe((response) => {
        console.log('response ==> ' + JSON.stringify(response));
        // this.editInterviewForm.get('interview').setValue(null);
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
      interviewer: [''],
      reference: [''],
      joining: [],
      feedback: [''],
      result: [''],
      interviewDate: [''],
      nextRoundDate: [],
      interviewId: [],
      round: [],
      scheduledDate: [],
    });
  }

  saveInterview() {

    let body = this.prepareJson();

    this.httpService.callApi('SaveOrUpdateInterview', { body: body }).subscribe((response) => {
      console.log('response ==> ' + JSON.stringify(response));
      this.closeModalEvent.emit(false);
    }, error => {

    })


    

  }


  prepareJson() {

    let data = this.editInterviewForm.getRawValue();
    let nextRoundDate;
    let nextRoundDateArray;

    let scheduledRoundDate;
    let scheduledRoundDateArray;
    if (data.nextRoundDate) {
      nextRoundDate = moment.tz(new Date(data.nextRoundDate), "Asia/Calcutta").format();
      nextRoundDateArray = nextRoundDate.split('+');
      // console.log(" check date ==> "+nextRoundDateArray[0]+".173");
    }

    if (data.scheduledDate) {
      scheduledRoundDate = moment.tz(new Date(data.scheduledDate), "Asia/Calcutta").format();
      scheduledRoundDateArray = scheduledRoundDate.split('+');
      // console.log(" check date ==> "+nextRoundDateArray[0]+".173");
    }

    let jsonData = {

      // roundNum: this.round,
      roundNo: this.round,
      joiningDate: data.joining == null ? null : moment.tz(new Date(data.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
      selected: data.result,
      roundDate: data.interviewDate == null ? null : moment.tz(new Date(data.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
      interviewedBy: data.interviewer,
      description: data.feedback,
      nextRoundScheduleOn: data.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
      profile: data.profile,
      referedBy: data.reference,
      id: this.editModalData,
      scheduledDate:data.scheduledDate == null ? null : scheduledRoundDateArray[0] + ".173",
    }
    console.log('jsonDATA ==>  ' + JSON.stringify(jsonData));

    return jsonData;
  }







  changeAction(e) {

    this.showRoundDate = true;
    this.showScheduledDate = false;
    this.showInterviwer = true;

    this.editInterviewForm.get('interviewDate').setValidators(Validators.required);
    this.editInterviewForm.get('feedback').setValidators(Validators.required);
    this.editInterviewForm.get('interviewer').setValidators(Validators.required);
    this.editInterviewForm.get('scheduledDate').setValue(null);
    this.editInterviewForm.get('scheduledDate').clearValidators();
    if (e === "Next Round") {
      this.showNextRoundDate = true;
      this.showJoinDate = false;

      // this.editInterviewForm.get('attachment').get('url').clearValidators();
      this.editInterviewForm.get('nextRoundDate').setValidators(Validators.required);
      this.editInterviewForm.get('joining').setValue(null);
    } else if (e === "Joining") {
      this.showJoinDate = true;
      this.showNextRoundDate = false;
      this.editInterviewForm.get('joining').setValidators(Validators.required);
      this.editInterviewForm.get('nextRoundDate').setValue(null);
    } else if (e === "Scheduled") {
      this.showScheduledDate = true;
      this.showNextRoundDate = false;
      this.showJoinDate = false;
      this.showRoundDate = false;
      this.showInterviwer = false;

      this.editInterviewForm.get('scheduledDate').setValidators(Validators.required);
      this.editInterviewForm.get('nextRoundDate').clearValidators();
      this.editInterviewForm.get('joining').clearValidators();
      this.editInterviewForm.get('interviewDate').clearValidators();
      this.editInterviewForm.get('feedback').clearValidators();
      this.editInterviewForm.get('interviewer').clearValidators();

      this.editInterviewForm.get('nextRoundDate').setValue(null);
      this.editInterviewForm.get('joining').setValue(null);
      this.editInterviewForm.get('interviewDate').setValue(null);
      this.editInterviewForm.get('feedback').setValue(null);
      this.editInterviewForm.get('interviewer').setValue(null);

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
      this.changeAction("Next Round");
    } else if (value.joiningDate) {
      this.changeAction("Joining");
    } else if (value.scheduledDate){
      this.changeAction("Scheduled");
    }

      let arrayData = {

        round: value.round ? value.round : null,
        joining: value.joiningDate ? moment.tz(new Date(value.joiningDate), "Asia/Calcutta").toDate() : null,
        result: value.candidateStatus,
        interviewDate: value.roundDate ? moment.tz(new Date(value.roundDate), "Asia/Calcutta").toDate() : null,
        interviewer: value.interviewedBy,
        feedback: value.description,
        nextRoundDate: value.nextRoundScheduleOn ? moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").toDate() : null,
        profile: value.profile,
        reference: value.referedBy ? value.referedBy : null,
        interviewId: value.id,
        scheduledDate: value.scheduledDate ? moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").toDate() : null,
      }
    this.editInterviewForm.patchValue(arrayData);
  }


  cancle() {
    this.closeModalEvent.emit(false);
  }

}
