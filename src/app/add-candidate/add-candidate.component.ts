import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// import { moment } from 'fullcalendar';
import * as moment from 'moment-timezone';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusDropdownDataService } from '../service/status-dropdown-data.service';

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
  showRoundDate: boolean[] = [false];
  showPG: boolean = false;
  showNextRoundDate: boolean[] = [false];
  showScheduledDate: boolean[] = [false];
  notFocused = false;
  notFocusedPMobile = false;
  interviewList: any = [];
  showEditButton: boolean = false;
  disabledTextField: boolean[] = [false];
  routeParamId: any;
  showInterviwer: boolean[] = [false];
  statusDropdownData: any;
  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute,
    private toastr: ToastrService, private StatusDropdownDataService: StatusDropdownDataService, private router: Router) {
  }

  ngOnInit() {

    this.showCandidate = true;
    this.loadLoginForm();
    this.addForm.get('education').setValue("graduate");

    // this.statusDropdownDataService = StatusDropdownDataService;
    this.StatusDropdownDataService.getStatusDropdownData((data) => {
      this.statusDropdownData = data;
    })


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
        this.toastr.error(error.error.message)
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
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')
      ])],
      pMobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[6-9]\\d{9}')
      ])],
      sMobile: ['', Validators.compose([
        Validators.pattern('[6-9]\\d{9}')
      ])],
      blacklist: [],
      education: ['', Validators.required],
      pCollege: [],
      pCollegeMarks: [],
      college: ['', Validators.required],
      collegeMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      hSchool: ['', Validators.required],
      hMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      iSchool: ['', Validators.required],
      iMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      interview: this.fb.array([this.addinterviewsGroup()]),
      aadhar: ['', Validators.compose([
        Validators.pattern('^[0-9]*$')
      ])],
      gender: ['', Validators.required],
      reference: ['']

    });
  }

  addinterviewsGroup(data?) {
    return this.fb.group({
      round: [(data && data.round) ? data.round : ''],
      profile: [(data && data.profile) ? data.profile : '', Validators.required],
      interviewer: [(data && data.interviewer) ? data.interviewer : ''],
      joining: [(data && data.joining) ? data.joining : null],
      interviewDate: [(data && data.interviewDate) ? data.interviewDate : null],
      nextRoundDate: [(data && data.nextRoundDate) ? data.nextRoundDate : null],
      feedback: [(data && data.feedback) ? data.feedback : ''],
      result: [(data && data.result) ? data.result : '', Validators.required],
      interviewId: [(data && data.interviewId) ? data.interviewId : null],
      scheduledDate: [(data && data.scheduledDate) ? data.scheduledDate : null]
    });
  }

  addInterview() {
    this.interviewArray.push(this.addinterviewsGroup());
    this.disabledTextField[this.interviewArray.length - 1] = false;
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
          this.toastr.success("successful deleted");
          this.interviewArray.removeAt(index);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['candidate', this.routeParamId]);

        }, error => {

        })
      } else {
        this.interviewArray.removeAt(index);
        // this.ngOnInit();
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
     this.toastr.success("success");
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate(['candidate', response.id]);
    }, error => {
      console.log(error);
      this.toastr.error(error.error.message);
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
      referedBy: data.reference
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
        let scheduledRoundDate;
        let scheduledDateArray;
        if (value.interviewId) {
          id = value.interviewId;
        }
        if (value.nextRoundDate) {
          nextRoundDate = moment.tz(new Date(value.nextRoundDate), "Asia/Calcutta").format();
          nextRoundDateArray = nextRoundDate.split('+');
          // console.log(" check date ==> "+nextRoundDateArray[0]+".173");
        }
        if (value.scheduledDate) {
          scheduledRoundDate = moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").format();
          scheduledDateArray = scheduledRoundDate.split('+');
        }

        return {
          "candidateStatus": value.result,
          "roundDate": value.interviewDate == null ? null : moment.tz(new Date(value.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
          "interviewedBy": value.interviewer,
          "description": value.feedback,
          "nextRoundScheduleOn": value.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
          "profile": value.profile,
          "joiningDate": value.joining == null ? null : moment.tz(new Date(value.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
          "id": id,
          "scheduledDate": value.scheduledDate == null ? null : scheduledDateArray[0] + ".173",

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
      this.addForm.get('pCollegeMarks').setValidators([Validators.required, Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')])
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

    this.showRoundDate[index] = true;
    this.showScheduledDate[index] = false;
    this.showInterviwer[index] = true;

    this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValidators(Validators.required);
    this.addForm.get('interview')['controls'][index].controls['feedback'].setValidators(Validators.required);
    this.addForm.get('interview')['controls'][index].controls['interviewer'].setValidators(Validators.required);
    this.addForm.get('interview')['controls'][index].controls['scheduledDate'].clearValidators;
    this.addForm.get('interview')['controls'][index].controls['scheduledDate'].setValue(null);
    if (e === "Next Round") {
      this.showNextRoundDate[index] = true;
      this.showJoinDate[index] = false;

      // this.addForm.get('attachment').get('url').clearValidators();
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValidators(Validators.required);
      this.addForm.get('interview')['controls'][index].controls['joining'].setValue(null);
    } else if (e === "Joining") {
      this.showJoinDate[index] = true;
      this.showNextRoundDate[index] = false;
      this.addForm.get('interview')['controls'][index].controls['joining'].setValidators(Validators.required);
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValue(null);
    } else if (e === "Scheduled") {
      this.showScheduledDate[index] = true;
      this.showNextRoundDate[index] = false;
      this.showJoinDate[index] = false;
      this.showRoundDate[index] = false;
      this.showInterviwer[index] = false;

      this.addForm.get('interview')['controls'][index].controls['scheduledDate'].setValidators(Validators.required);
      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['joining'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['interviewDate'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['feedback'].clearValidators();
      this.addForm.get('interview')['controls'][index].controls['interviewer'].clearValidators();

      this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValue(null);
      this.addForm.get('interview')['controls'][index].controls['joining'].setValue(null);
      this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValue(null);
      this.addForm.get('interview')['controls'][index].controls['feedback'].setValue(null);
      this.addForm.get('interview')['controls'][index].controls['interviewer'].setValue(null);

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
          reference: data.referedBy
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
        this.showRoundDate[incVaribale] = true;
        this.showScheduledDate[incVaribale] = false;
        this.showInterviwer[incVaribale] = true;
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
        let scheduleDate;
        let scheduledDateArray;

        if (value.scheduledDate) {
          this.showJoinDate[incVaribale] = false;
          this.showNextRoundDate[incVaribale] = false;
          this.showScheduledDate[incVaribale] = true;
          this.showInterviwer[incVaribale] = false;
          this.showRoundDate[incVaribale] = false;
          scheduleDate = moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").format();
          scheduledDateArray = scheduleDate.split('+');
          console.log(" check date ==> " + scheduledDateArray[0] + ".173");

        }


        incVaribale++;



        let arrayData = {

          round: value.round ? value.round : null,
          joining: value.joiningDate ? moment.tz(new Date(value.joiningDate), "Asia/Calcutta").toDate() : null,
          result: value.candidateStatus,
          interviewDate: value.roundDate ? moment.tz(new Date(value.roundDate), "Asia/Calcutta").toDate() : null,
          interviewer: value.interviewedBy,
          feedback: value.description,
          nextRoundDate: value.nextRoundScheduleOn ? moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").toDate() : null,
          profile: value.profile,
          interviewId: value.id,
          scheduledDate: value.scheduledDate ? moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").toDate() : null,
        }
        this.interviewList.push(arrayData);
        return arrayData;
      });
      return myData;
    }
  }

}
