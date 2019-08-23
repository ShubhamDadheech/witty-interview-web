import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// import { moment } from 'fullcalendar';
import * as moment from 'moment-timezone';
import { HttpService } from '../service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  addForm: FormGroup;
  showEditModal: boolean = false;
  showCandidate: boolean = false
  editModalData: any;
  showJoinDate: boolean[] = [false];
  showPG: boolean = false;
  showNextRoundDate: boolean[] = [false];
  notFocused = false;
  notFocusedPMobile = false;
  interviewList: any = [];
  showEditButton: boolean = false;
  disabledTextField: boolean[] = [false];
  routeParamId: any;
  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.showCandidate = true;
    this.loadLoginForm();
    this.addForm.get('education').setValue("graduate");
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.routeParamId = params.id;
      if (params.id) {
        // this.httpService.callApi('getCandidateById', { pathVariable: params.id }).subscribe((response) => {
        //   console.log('response ==> ' + JSON.stringify(response));
        //   // this.addForm.get('interview').setValue(null);
        //   this.interviewArray.removeAt(0);
        //   this.showEditButton = true;
        //   this.setValue(response)
        // }, error => {

        // })
        this.getCandidateById(this.routeParamId);
      } else {

      }
    });

  }

  getCandidateById(id) {
    if (id) {
      this.httpService.callApi('getCandidateById', { pathVariable: id }).subscribe((response) => {
        console.log('response ==> ' + JSON.stringify(response));
        // this.addForm.get('interview').setValue(null);
        this.interviewArray.removeAt(0);
        this.showEditButton = true;
        this.setValue(response)
      }, error => {

      })
    } else {

    }
  }

  loadLoginForm() {
    this.addForm = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      email: ['', Validators.required],
      pMobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])],
      sMobile: ['', Validators.compose([
        Validators.pattern('^[0-9]*$')
      ])],
      blacklist: [],
      education: ['', Validators.required],
      pCollege: [],
      pCollegeMarks: [],
      college: ['', Validators.required],
      collegeMarks: ['', Validators.required],
      hSchool: ['', Validators.required],
      hMarks: ['', Validators.compose([
        Validators.required,
        //  Validators.pattern('^(100\.0000|[1-9]?\d\.\d{4})$')
      ])],
      iSchool: ['', Validators.required],
      iMarks: ['', Validators.required],
      interview: this.fb.array([this.addinterviewsGroup()]),
      aadhar: ['', Validators.compose([
        Validators.pattern('^[0-9]*$')
      ])],
      gender: ['', Validators.required]

    });
  }

  addinterviewsGroup(data?) {
    return this.fb.group({
      round: [(data && data.round) ? data.round : ''],
      profile: [(data && data.profile) ? data.profile : '', Validators.required],
      interviewer: [(data && data.interviewer) ? data.interviewer : '', Validators.required],
      reference: [(data && data.reference) ? data.reference : ''],
      joining: [(data && data.joining) ? data.joining : null],
      interviewDate: [(data && data.interviewDate) ? data.interviewDate : null, Validators.required],
      nextRoundDate: [(data && data.nextRoundDate) ? data.nextRoundDate : null],
      feedback: [(data && data.feedback) ? data.feedback : '', Validators.required],
      result: [(data && data.result) ? data.result : '', Validators.required],
      interviewId: [(data && data.interviewId) ? data.interviewId : null]
    });
  }

  addInterview() {
    this.interviewArray.push(this.addinterviewsGroup());
    this.showEditButton = false;
  }


  removeInterview(index, id?) {
    if (confirm("Are you sure to delete ")) {

      if (this.addForm.get('interview')['controls'][index - 1].controls['interviewId'].value != null) {
        this.showEditButton = true;
      }

      if (id) {
        this.httpService.callApi('deleteInterview', { pathVariable: id }).subscribe((response) => {
          console.log('response success ==> ' + JSON.stringify(response));
          this.ngOnInit();
        }, error => {

        })
      } else {
        this.interviewArray.removeAt(index);
        this.ngOnInit();
      }
    }

  }

  get interviewArray() {
    return <FormArray>this.addForm.get('interview');
  }

  addCandidate() {


    // this.prepareInterviewData();
    let body = this.prepareJson();

    this.httpService.callApi('createOrUpdateCandidate', { body: body }).subscribe((response) => {
      // console.log('response ==> ' +JSON.stringify(response) );
      this.ngOnInit();
    }, error => {

    })
  }

  prepareJson() {
    let data = this.addForm.getRawValue();
    let id = null;
    if (data.id) {
      id = data.id;
    }


    let json = {
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,
      primaryMobileNum: data.pMobile,
      email: data.email,
      highSchoolCollegeName: data.hSchool,
      highSchoolMarksPercentage: data.hMarks,
      interMediateCollegeName: data.iSchool,
      interMediateMarksPercentage: data.iMarks,
      blackListed: data.blacklist == null ? false : data.blacklist,
      secondaryMobileNum: data.sMobile,
      interviewDetailsDtos: this.prepareInterviewData(),
      graduationCollegeName: data.college,
      graduationCollegeMarksPercentage: data.collegeMarks,
      postGraduationCollegeName: data.pCollege,
      postGraduationCollegeMarksPercentage: data.pCollegeMarks,
      aadhaarNum: data.aadhar,
      gender: data.gender,
    }
    // console.log("final JSON ==> " + JSON.stringify(json));

    return json;

  }

  prepareInterviewData() {
    let data = this.addForm.getRawValue();


    if (data || data.interview) {
      let myData = data.interview.map(value => {
        let id = null;
        let nextRoundDate;
        let nextRoundDateArray;
        if (value.interviewId) {
          id = value.interviewId;
        }
        if (value.nextRoundDate) {
          nextRoundDate = moment.tz(new Date(value.nextRoundDate), "Asia/Calcutta").format();
          nextRoundDateArray = nextRoundDate.split('+');
          // console.log(" check date ==> "+nextRoundDateArray[0]+".173");
        }

        return {
          "selected": value.result,
          "roundDate": value.interviewDate == null ? null : moment.tz(new Date(value.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
          "interviewedBy": value.interviewer,
          "description": value.feedback,
          "nextRoundScheduleOn": value.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
          "profile": value.profile,
          "joiningDate": value.joining == null ? null : moment.tz(new Date(value.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
          "id": id,


        }
      });

      return myData;
    }

  }
  editCandidate(data) {
    this.editModalData = data;
    this.showCandidate = false;
    this.showEditModal = true;
  }

  hideEditModal = ($event) => {
    this.showEditModal = false;
    this.showCandidate = true;
    this.ngOnInit();
  }

  onKeyPress(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onKeyPressPersent(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
      return false;
    }
    return true;

  }

  changeActionEducation(event) {
    console.log('Inside pg ' + event)
    if (event === "postgraduate") {

      this.showPG = true;
      this.addForm.get('pCollege').setValidators(Validators.required);
      this.addForm.get('pCollegeMarks').setValidators(Validators.required);
      this.addForm.get('education').setValue('postgraduate');


    } else {
      this.showPG = false;
      this.addForm.get('pCollege').clearValidators();
      this.addForm.get('pCollegeMarks').clearValidators();
      this.addForm.get('education').setValue('graduate');
      this.addForm.get('pCollege').setValue(null);
      this.addForm.get('pCollegeMarks').setValue(null);

    }


  }


  changeAction(e, index) {

    if (e === "null") {
      this.showNextRoundDate[index] = true;
      this.showJoinDate[index] = false;

      // this.addForm.get('attachment').get('url').clearValidators();
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValidators(Validators.required);
      this.addForm.get('interview')['controls'][index].controls['joining'].setValue(null);
    } else if (e === "true") {
      this.showJoinDate[index] = true;
      this.showNextRoundDate[index] = false;
      this.addForm.get('interview')['controls'][index].controls['joining'].setValidators(Validators.required);
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValue(null);
    } else {
      this.showNextRoundDate[index] = false;
      this.showJoinDate[index] = false;
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['joining'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValue(null);
      this.addForm.get('interview')['controls'][index].controls['joining'].setValue(null);
    }
  }



  setValue(data) {

    if (data) {
      let interviedData = this.setInterviewData(data);



      if (this.addForm) {
        let data1 = {
          id: data.id,
          firstName: data.firstName == null ? '' : data.firstName,
          lastName: data.lastName,
          fatherName: data.fatherName,
          email: data.email,
          pMobile: data.primaryMobileNum,
          sMobile: data.secondaryMobileNum != null ? data.secondaryMobileNum : '',
          blacklist: data.blackListed,
          college: data.highSchoolCollegeName,
          collegeMarks: data.highSchoolMarksPercentage,
          hSchool: data.highSchoolCollegeName,
          hMarks: data.highSchoolMarksPercentage,
          iSchool: data.interMediateCollegeName,
          iMarks: data.interMediateMarksPercentage,
          // interview: this.setInterviewData(data),
          education: data.postGraduationCollegeName == null ? 'graduate' : 'postgraduate',
          pCollege: data.postGraduationCollegeName != null ? data.postGraduationCollegeName : '',
          pCollegeMarks: data.postGraduationCollegeMarksPercentage != null ? data.postGraduationCollegeMarksPercentage : '',
          aadhar: data.aadhaarNum,
          gender: data.gender,
        };
        // console.log('data1 ', data1)
        this.addForm.patchValue(data1);
        //this.interviewArray.patchValue(interviedData[1])
        interviedData.forEach(element => {
          this.interviewArray.push(this.addinterviewsGroup(element));
        });
        console.log('pg data' + data.postGraduationCollegeMarksPercentage);
        if (data.postGraduationCollegeName && data.postGraduationCollegeMarksPercentage) {


          this.changeActionEducation("postgraduate");
        } else {
          this.changeActionEducation("graduate");
        }
        // console.log(this.addForm.getRawValue());
      }

    }
  }


  setInterviewData(data) {

    if (data || data.interviewDetailsDtos) {


      let incVaribale = 0;
      let myData = data.interviewDetailsDtos.map(value => {

        // console.log('value.selected ==> '+value.selected);
        // console.log('============================');
        let nextRoundDate;
        let nextRoundDateArray;
        this.disabledTextField[incVaribale] = true;
        if (value.joiningDate) {
          this.showJoinDate[incVaribale] = true;
          this.showNextRoundDate[incVaribale] = false;
        }
        if (value.nextRoundScheduleOn) {
          this.showJoinDate[incVaribale] = false;
          this.showNextRoundDate[incVaribale] = true;

          nextRoundDate = moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").format();
          nextRoundDateArray = nextRoundDate.split('+');
          console.log(" check date ==> " + nextRoundDateArray[0] + ".173");

        }

        incVaribale++;



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
        this.interviewList.push(arrayData);
        return arrayData;
      });
      return myData;
    }
  }

}
