import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  holidays: Array<Date>;
  showBlacklistReason: boolean = false;
  showDiploma: boolean = false;
  interviewTypeData: any;
  interviewModeData: any;
  showReasonForJoin: boolean = false;
  showJoin: boolean = false;
  showInterviewSave: boolean = false;
  experienceList: any = [];
  invalidExperience: boolean = false;
  loadder: boolean = false;
  updatedInterviewDate: any;
  disabledInterviewDate: boolean[] = [false];
  constructor(private fb: FormBuilder, private httpService: HttpService, private route: ActivatedRoute,
    private toastr: ToastrService, private StatusDropdownDataService: StatusDropdownDataService, private router: Router) {

  }

  ngOnInit() {
    this.loadder = true;
    this.showCandidate = true;
    this.loadLoginForm();
    this.addForm.get('education').setValue("graduate");

    // this.statusDropdownDataService = StatusDropdownDataService;
    this.StatusDropdownDataService.getStatusDropdownData((data) => {
      this.statusDropdownData = data.interviewStatus;
      this.interviewTypeData = data.interviewType;
      this.interviewModeData = data.interviewMode;
    })


    this.route.params.subscribe(params => {
      this.routeParamId = params.id;
      if (params.id) {
        this.getCandidateById(this.routeParamId);
        this.loadder = false;
      } else {
        this.loadder = false;
      }
    });

  }

  getCandidateById(id) {
    if (id) {
      this.httpService.callApi('getCandidateById', { pathVariable: id }).subscribe((response) => {
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
      lastName: [''],
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

      college: ['', Validators.required],
      collegeMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      collegeMarksType: ['', Validators.required],
      collegeComment: [''],

      hSchool: ['', Validators.required],
      hMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      hMarksType: ['', Validators.required],
      hComment: [''],

      iSchool: ['', Validators.required],
      iMarks: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')
      ])],
      iMarksType: [null, Validators.required],
      iComment: [''],

      aadhar: ['', Validators.compose([
        Validators.pattern('^[0-9]*$')
      ])],
      gender: ['', Validators.required],
      reference: [],

      pCollege: [],
      pCollegeMarks: [null],
      pCollegeMarksType: [],
      pCollegeComment: [],
      profile: ['', Validators.required],
      joined: [null],
      reasonForNotJoining: [null],
      blackListReason: [''],

      dComment: [],
      dMarksType: [],
      dMarks: [],
      dSchool: [],
      diploma: [],
      interview: this.fb.array([this.addinterviewsGroup()]),
      experience: this.fb.array([]),

    });
  }

  addinterviewsGroup(data?) {
    return this.fb.group({
      round: [(data && data.round) ? data.round : ''],
      interviewer: [(data && data.interviewer) ? data.interviewer : ''],
      joining: [(data && data.joining) ? data.joining : null],
      interviewDate: [(data && data.interviewDate) ? data.interviewDate : null],
      nextRoundDate: [(data && data.nextRoundDate) ? data.nextRoundDate : null],
      feedback: [(data && data.feedback) ? data.feedback : ''],
      result: [(data && data.result) ? data.result : '', Validators.required],
      interviewMode: [(data && data.interviewMode) ? data.interviewMode : '', Validators.required],
      interviewType: [(data && data.interviewType) ? data.interviewType : '', Validators.required],

      interviewId: [(data && data.interviewId) ? data.interviewId : null],
      scheduledDate: [(data && data.scheduledDate) ? data.scheduledDate : null],
      allowForcefully: [(data && data.override) ? data.override : null]
    });
  }

  addExperienceGroup(data?) {
    this.invalidExperience = true;
    return this.fb.group({
      organization: [(data && data.organization) ? data.organization : '', Validators.required],
      from: [(data && data.from) ? data.from : '', Validators.required],
      to: [(data && data.to) ? data.to : '', Validators.required],
      duration: [(data && data.duration) ? data.duration : ''],
      techStack: [(data && data.techStack) ? data.techStack : '', Validators.required],
      id: [(data && data.id) ? data.id : null]
    });
  }

  addExperience() {
    this.experienceArray.push(this.addExperienceGroup());
  }

  addInterview(index) {
    this.interviewArray.push(this.addinterviewsGroup());
    this.disabledTextField[this.interviewArray.length - 1] = false;
    this.showEditButton = false;
    this.setRoundDateFromPreviousDate(index);
  }


  setRoundDateFromPreviousDate(index) {
    let date;
    if (this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].value) {

      date = this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].value;

    } else if (this.addForm.get('interview')['controls'][index].controls['scheduledDate'].value) {

      date = this.addForm.get('interview')['controls'][index].controls['scheduledDate'].value;

    } else if (this.addForm.get('interview')['controls'][index].controls['joining'].value) {

      date = this.addForm.get('interview')['controls'][index].controls['joining'].value;

    }
    this.updatedInterviewDate = date;
  }

  showHideBlacklist() {
    this.showBlacklistReason = !this.showBlacklistReason;
    if (this.showBlacklistReason) {
      this.addForm.get('blackListReason').setValidators(Validators.required);
    } else {
      this.addForm.get('blackListReason').clearValidators();
      this.addForm.get('blackListReason').setValue(null);
    }

  }


  showHideDiploma() {
    this.showDiploma = !this.showDiploma;

    if (this.showDiploma) {

      this.addForm.get('dMarksType').setValidators(Validators.required);
      this.addForm.get('dMarks').setValidators(Validators.required);
      this.addForm.get('dSchool').setValidators(Validators.required);

      this.addForm.get('iMarksType').clearValidators();
      this.addForm.get('iMarks').clearValidators();
      this.addForm.get('iSchool').clearValidators();
      this.addForm.get('iComment').clearValidators();


      this.addForm.get('iMarksType').updateValueAndValidity();
      this.addForm.get('iMarks').updateValueAndValidity();
      this.addForm.get('iSchool').updateValueAndValidity();
      this.addForm.get('iComment').updateValueAndValidity();
      // this.addForm.get('iMarksType').setValue(null);

    } else {


      this.addForm.get('dMarksType').clearValidators();
      this.addForm.get('dMarks').clearValidators();
      this.addForm.get('dSchool').clearValidators();

      this.addForm.get('dMarksType').setValue(null);
      this.addForm.get('dMarks').setValue(null);
      this.addForm.get('dSchool').setValue(null);
      this.addForm.get('dComment').setValue(null);

      this.addForm.get('iMarksType').setValidators(Validators.required);
      this.addForm.get('iMarks').setValidators(Validators.required);
      this.addForm.get('iSchool').setValidators(Validators.required);

    }
  }

  removeInterview(index, id?) {
    if (confirm("Are you sure to delete ")) {

      if (this.addForm.get('interview')['controls'][index].controls['interviewType'].value == "HR") {
        this.showJoin = false;
        this.addForm.get('reasonForNotJoining').setValue(null);
        this.addForm.get('reasonForNotJoining').clearValidators();
        this.clearRadioButtonData();
      }

      if (this.addForm.get('interview')['controls'][index - 1].controls['interviewId'].value != null) {
        this.showEditButton = true;
      }

      if (id) {
        this.httpService.callApi('deleteInterview', { pathVariable: id }).subscribe((response) => {
          this.toastr.success("successful deleted");
          this.interviewArray.removeAt(index);
          this.addCandidate();
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['witty/candidate', this.routeParamId]);

        }, error => {

        })
      } else {
        this.interviewArray.removeAt(index);
        // this.ngOnInit();
      }



    }

  }

  removeExperienceArray(index, id) {
    this.invalidExperience = false;
    this.experienceArray.removeAt(index);
  }

  get interviewArray() {
    return <FormArray>this.addForm.get('interview');
  }

  get experienceArray() {
    return <FormArray>this.addForm.get('experience');
  }
  addCandidate() {

    this.loadder = true;
    // this.prepareInterviewData();
    let body = this.prepareJson();



    this.httpService.callApi('createOrUpdateCandidate', { body: body }).subscribe((response) => {

      this.toastr.success("success");
      this.loadder = false;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['witty/candidate', response.id]);
    }, error => {
      this.loadder = false;

      this.toastr.error(error.error.message);

    })
  }


  showDiplomaAndSetValue() {
    this.showDiploma = true;

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

      blackListed: data.blacklist == null ? false : data.blacklist,
      reasonForBlackListed: data.blackListReason,
      joined: data.joined,
      reasonForNotJoining: data.reasonForNotJoining,


      secondaryMobileNum: data.sMobile,
      interviewDetailsDtos: this.prepareInterviewData(),
      aadhaarNum: data.aadhar,
      gender: data.gender,
      referedBy: data.reference,
      profile: data.profile,


      graduationCollegeName: data.college,
      graduationMarks: data.collegeMarks,
      graduationNotes: data.collegeComment,
      graduationMarksType: data.collegeMarksType,


      postGraduationCollegeName: data.pCollege,
      postGraduationMarks: data.pCollegeMarks,
      postGraduationNotes: data.pCollegeComment,
      postGraduationMarksType: data.pCollegeMarksType,

      interMediateMarksType: data.iMarksType,
      interMediateNotes: data.iComment,
      interMediateCollegeName: data.iSchool,
      interMediateMarks: data.iMarks,

      highSchoolMarksType: data.hMarksType,
      highSchoolNotes: data.hComment,
      highSchoolCollegeName: data.hSchool,
      highSchoolMarks: data.hMarks,

      isDiploma: data.diploma == null ? false : data.diploma,
      diplomaCollageName: data.dSchool,
      diplomaMarksType: data.dMarksType,
      diplomaMarks: data.dMarks,
      diplomaNotes: data.dComment,
      experienceDto: this.prepareExperienceData(),

    }
    return json;

  }


  prepareExperienceData() {
    let data = this.addForm.getRawValue();
    if (data || data.experience) {
      let experienceData = data.experience.map(value => {
        let id = null;
        if (value.id) {
          id = value.id;
        }
        return {

          "organizationName": value.organization,
          "startFrom": value.from,
          "endAt": value.to,
          "technology": value.techStack,
          "duration": value.duration,
          "id": id

        }
      });
      return experienceData;
    }
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
        }
        if (value.scheduledDate) {
          scheduledRoundDate = moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").format();
          scheduledDateArray = scheduledRoundDate.split('+');
        }

        return {
          "interviewStatus": value.result,
          "roundDate": value.interviewDate == null ? null : moment.tz(new Date(value.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
          "interviewedBy": value.interviewer,
          "description": value.feedback,
          "nextRoundScheduleOn": value.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
          "joiningDate": value.joining == null ? null : moment.tz(new Date(value.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
          "id": id,
          "scheduledDate": value.scheduledDate == null ? null : scheduledDateArray[0] + ".173",
          "interviewType": value.interviewType,
          "interviewMode": value.interviewMode,
          "override": value.allowForcefully,

        }
      });

      return myData;
    }

  }
  editCandidate(data, index) {
    // this.editModalData = data;
    // this.showCandidate = false;
    // this.showEditModal = true;
    this.showInterviewSave = true;
    this.disabledTextField[index] = false;
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

  duration(index, controlName) {

    if (this.addForm.get('experience')['controls'][index].controls['from'].value && this.addForm.get('experience')['controls'][index].controls['to'].value) {

      var oldDateMoment = moment(this.addForm.get('experience')['controls'][index].controls['from'].value);
      var newDateMoment = moment(this.addForm.get('experience')['controls'][index].controls['to'].value);

      var numYears = newDateMoment.diff(oldDateMoment, 'years');
      oldDateMoment = oldDateMoment.add(numYears, 'years');
      var numMonths = newDateMoment.diff(oldDateMoment, 'months');
      oldDateMoment = oldDateMoment.add(numMonths, 'months');
      var numDays = newDateMoment.diff(oldDateMoment, 'days');
      numDays = numDays + 1;

      let year = numYears != 0 ? numYears + " years, " : "";
      let month = numMonths != 0 ? numMonths + " months, " : "";
      let days = numDays != 0 ? numDays + " days " : numDays + " day ";
      var value = year + "" + month + "" + days;
      this.addForm.get('experience')['controls'][index].controls['duration'].setValue(value);

    }
    this.validateExperience(index);
  }

  onKeyPressPersent(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
      return false;
    }
    return true;

  }

  changeFirstLetterCapital(controlerName) {
    let name = this.addForm.get(controlerName).value;
    name = name.charAt(0).charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    this.addForm.get(controlerName).setValue(name);
  }

  changeActionEducation(event) {
    if (event === "postgraduate") {

      this.showPG = true;
      this.addForm.get('pCollege').setValidators(Validators.required);
      this.addForm.get('pCollegeMarks').setValidators([Validators.required, Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')])
      this.addForm.get('pCollegeMarksType').setValidators(Validators.required);
      this.addForm.get('education').setValue('postgraduate');


    } else {
      this.showPG = false;
      this.addForm.get('pCollege').clearValidators();
      this.addForm.get('pCollegeMarksType').clearValidators();
      this.addForm.get('pCollegeMarks').clearValidators();
      this.addForm.get('education').setValue('graduate');
      this.addForm.get('pCollege').setValue(null);
      this.addForm.get('pCollegeMarks').setValue(null);

    }


  }

  changeActionEvent(event, index) {
    this.clearValidation(index);
    this.addForm.get('interview')['controls'][index].controls['feedback'].setValidators(Validators.required);
    this.addForm.get('interview')['controls'][index].controls['interviewer'].setValidators(Validators.required);
    this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValidators(Validators.required);
    this.showRoundDate[index] = true;
    this.showInterviwer[index] = true;

    //for set previous date 
    this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValue(this.updatedInterviewDate);
    this.disabledInterviewDate[index] = true;
    switch (event) {
      case "Rejected": {
        break;
      }
      case "Next Round": {
        this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValidators(Validators.required);
        this.showNextRoundDate[index] = true;
        break;
      }
      case "Offer Placed": {
        this.addForm.get('interview')['controls'][index].controls['joining'].setValidators(Validators.required);
        this.showJoinDate[index] = true;
        break;
      }
      case "Scheduled": {
        this.showScheduledDate[index] = true;
        this.showRoundDate[index] = false;
        this.showInterviwer[index] = false;
        this.addForm.get('interview')['controls'][index].controls['feedback'].clearValidators();
        this.addForm.get('interview')['controls'][index].controls['interviewer'].clearValidators();
        this.addForm.get('interview')['controls'][index].controls['interviewDate'].clearValidators();
        this.addForm.get('interview')['controls'][index].controls['feedback'].setValue('');
        this.addForm.get('interview')['controls'][index].controls['interviewer'].setValue('');
        this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValue();
        this.addForm.get('interview')['controls'][index].controls['scheduledDate'].setValidators(Validators.required);
        break;
      }
      case "Did Not Appear": {
        this.showInterviwer[index] = false;
        this.addForm.get('interview')['controls'][index].controls['interviewer'].clearValidators();
        this.addForm.get('interview')['controls'][index].controls['interviewer'].setValue("");
        break;
      }
      default: {
        break;
      }
    }
  }

  clearValidation(index) {

    this.addForm.get('interview')['controls'][index].controls['scheduledDate'].clearValidators();
    this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].clearValidators();
    this.addForm.get('interview')['controls'][index].controls['joining'].clearValidators();
    this.addForm.get('interview')['controls'][index].controls['feedback'].clearValidators();
    this.addForm.get('interview')['controls'][index].controls['interviewer'].clearValidators();
    this.addForm.get('interview')['controls'][index].controls['interviewDate'].clearValidators();


    this.addForm.get('interview')['controls'][index].controls['scheduledDate'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['joining'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['feedback'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['interviewer'].markAsUntouched();
    // this.addForm.get('interview')['controls'][index].controls['interviewDate'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['interviewMode'].markAsUntouched();
    this.addForm.get('interview')['controls'][index].controls['interviewType'].markAsUntouched();


    this.addForm.get('interview')['controls'][index].controls['interviewDate'].setValue();
    this.addForm.get('interview')['controls'][index].controls['scheduledDate'].setValue();
    this.addForm.get('interview')['controls'][index].controls['interviewer'].setValue("");
    this.addForm.get('interview')['controls'][index].controls['nextRoundDate'].setValue();
    this.addForm.get('interview')['controls'][index].controls['joining'].setValue();
    this.addForm.get('interview')['controls'][index].controls['feedback'].setValue("");

    this.addForm.get('interview')['controls'][index].controls['interviewMode'].setValue("");
    this.addForm.get('interview')['controls'][index].controls['interviewType'].setValue("");




    this.showScheduledDate[index] = false;
    this.showInterviwer[index] = false;
    this.showNextRoundDate[index] = false;
    this.showJoinDate[index] = false;
  }




  setValue(data) {

    if (data) {
      let interviedData = this.setInterviewData(data);
      let experienceData = this.setExperienceData(data);



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
          blackListReason: data.reasonForBlackListed,

          college: data.graduationCollegeName,
          collegeMarks: data.graduationMarks,
          collegeComment: data.graduationNotes,
          collegeMarksType: data.graduationMarksType,

          hSchool: data.highSchoolCollegeName,
          hMarks: data.highSchoolMarks,
          hMarksType: data.highSchoolMarksType,
          hComment: data.interMediateNotes,


          iSchool: data.interMediateCollegeName,
          iMarks: data.interMediateMarks,
          iMarksType: data.interMediateMarksType,
          iComment: data.interMediateNotes,

          education: data.postGraduationCollegeName == null ? 'graduate' : 'postgraduate',

          pCollege: data.postGraduationCollegeName != null ? data.postGraduationCollegeName : '',
          pCollegeMarks: data.postGraduationMarks != null ? data.postGraduationMarks : '',
          pCollegeMarksType: data.postGraduationMarksType != null ? data.postGraduationMarksType : '',
          pCollegeComment: data.postGraduationNotes != null ? data.postGraduationNotes : '',

          diploma: data.isDiploma,
          dSchool: data.diplomaCollageName != null ? data.diplomaCollageName : '',
          dMarksType: data.diplomaMarksType != null ? data.diplomaMarksType : '',
          dMarks: data.diplomaMarks != null ? data.diplomaMarks : '',
          dComment: data.diplomaNotes != null ? data.diplomaNotes : '',

          profile: data.profile,
          aadhar: data.aadhaarNum,
          gender: data.gender,
          reference: data.referedBy,
          joined: data.joined,
          reasonForNotJoining: data.reasonForNotJoining,
        };

        this.addForm.patchValue(data1);
        //this.interviewArray.patchValue(interviedData[1])
        interviedData.forEach(element => {
          this.interviewArray.push(this.addinterviewsGroup(element));
        });

        experienceData.forEach(element => {
          this.experienceArray.push(this.addExperienceGroup(element));
        });

        if (data.postGraduationCollegeName && data.postGraduationMarks) {


          this.changeActionEducation("postgraduate");
        } else {
          this.changeActionEducation("graduate");
        }

        if (data.isDiploma) {
          this.showDiplomaAndSetValue();
        }

        if (data.reasonForBlackListed) {
          this.showBlacklistReason = true;
        }

        if (data.joined == false) {
          this.addForm.get('joined').setValue("false");
          this.showReasonForJoin = true;
          this.showJoin = true;
        } else if (data.joined == true) {
          this.showReasonForJoin = false;
          this.showJoin = true;
          this.addForm.get('joined').setValue("true");
        }
      }

    }
  }


  setExperienceData(data) {

    if (data || data.experienceDto) {
      let expData = data.experienceDto.map(value => {


        let arrayData = {
          organization: value.organizationName,
          from: value.startFrom ? moment.tz(new Date(value.startFrom), "Asia/Calcutta").toDate() : null,
          to: value.endAt ? moment.tz(new Date(value.endAt), "Asia/Calcutta").toDate() : null,
          techStack: value.technology,
          duration: value.duration,
          id: value.id,

        }
        this.experienceList.push(arrayData);
        return arrayData;
      });
      return expData;
    }

  }


  setInterviewData(data) {

    if (data || data.interviewDetailsDtos) {


      let incVaribale = 0;
      let myData = data.interviewDetailsDtos.map(value => {

        let nextRoundDate;
        let nextRoundDateArray;

        if (value.interviewStatus) {
          this.showRoundDate[incVaribale] = true;
          this.disabledTextField[incVaribale] = true;
          this.showInterviwer[incVaribale] = true;


          if (value.interviewStatus === "Rejected") {
            this.showInterviwer[incVaribale] = true;



          } else if (value.interviewStatus === "Next Round") {
            this.showNextRoundDate[incVaribale] = true;
            nextRoundDate = moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").format();
            nextRoundDateArray = nextRoundDate.split('+');

          } else if (value.interviewStatus === "Offer Placed") {
            this.showJoinDate[incVaribale] = true;

          } else if (value.interviewStatus === "Scheduled") {
            this.showRoundDate[incVaribale] = false;
            this.showScheduledDate[incVaribale] = true;
            this.showInterviwer[incVaribale] = false;

          } else if (value.interviewStatus === "Did Not Appear") {
            // this.showRoundDate[incVaribale] = false;
            this.showInterviwer[incVaribale] = false;
          }
        }

        incVaribale++;



        let arrayData = {

          round: value.round ? value.round : null,
          joining: value.joiningDate ? moment.tz(new Date(value.joiningDate), "Asia/Calcutta").toDate() : null,
          result: value.interviewStatus,
          interviewDate: value.roundDate ? moment.tz(new Date(value.roundDate), "Asia/Calcutta").toDate() : null,
          interviewer: value.interviewedBy,
          feedback: value.description,
          nextRoundDate: value.nextRoundScheduleOn ? moment.tz(new Date(value.nextRoundScheduleOn), "Asia/Calcutta").toDate() : null,
          profile: value.profile,
          interviewId: value.id,
          scheduledDate: value.scheduledDate ? moment.tz(new Date(value.scheduledDate), "Asia/Calcutta").toDate() : null,
          interviewType: value.interviewType,

          interviewMode: value.interviewMode,
          allowForcefully: value.override,
        }
        this.interviewList.push(arrayData);
        return arrayData;
      });
      return myData;
    }
  }


  radioClickNotJoined() {
    this.showReasonForJoin = true;
  }

  radioClickJoined() {
    this.showReasonForJoin = false;
  }

  clearRadioButtonData() {
    this.addForm.get('joined').setValue(null);
    this.showReasonForJoin = false;

  }

  changeInterviewType(event, index) {

    let resultData = this.addForm.get('interview')['controls'][index].controls.result.value
    if (index == 0 && event == "HR") {

      if (resultData != "Offer Placed") {
        this.toastr.warning("First round cannot be HR round");
        this.addForm.get('interview')['controls'][index].controls.interviewType.setValue("");
      } else {
        this.showJoin = true;
      }

    } else {

      if (this.addForm.get('interview')['controls'][index].controls.result.value == "Scheduled" && event == "HR") {
        this.toastr.warning("Cannot use Schedulde with HR round");
      } else {
        this.addForm.get('joined').setValue(null);
        if (event == "HR") {
          this.showJoin = true;
        } else {
          this.showJoin = false;
        }
      }
    }

  }



  saveInterview(id, index) {
    // let data = JSON.stringify(this.addForm.get('interview')['controls'][index].getRawValue());
    let data = this.addForm.get('interview')['controls'][index].value;

    // let data = this.addForm.getRawValue();
    let JsonData

    if (data) {
      let nextRoundDate;
      let nextRoundDateArray;
      let scheduledRoundDate;
      let scheduledDateArray;

      if (data.nextRoundDate) {
        nextRoundDate = moment.tz(new Date(data.nextRoundDate), "Asia/Calcutta").format();
        nextRoundDateArray = nextRoundDate.split('+');
      }
      if (data.scheduledDate) {
        scheduledRoundDate = moment.tz(new Date(data.scheduledDate), "Asia/Calcutta").format();
        scheduledDateArray = scheduledRoundDate.split('+');
      }

      JsonData = {
        "interviewStatus": data.result,
        "roundDate": data.interviewDate == null ? null : moment.tz(new Date(data.interviewDate), "Asia/Calcutta").format("YYYY-MM-DD"),
        "interviewedBy": data.interviewer,
        "description": data.feedback,
        "nextRoundScheduleOn": data.nextRoundDate == null ? null : nextRoundDateArray[0] + ".173",
        "joiningDate": data.joining == null ? null : moment.tz(new Date(data.joining), "Asia/Calcutta").format("YYYY-MM-DD"),
        "id": id,
        "scheduledDate": data.scheduledDate == null ? null : scheduledDateArray[0] + ".173",
        "interviewType": data.interviewType,
        "interviewMode": data.interviewMode,
        "override": data.allowForcefully
      }
    }

    this.httpService.callApi('SaveOrUpdateInterview', { body: JsonData }).subscribe((response) => {
      this.toastr.success("success");
      this.showInterviewSave = false;
      this.disabledTextField[index] = true;

    }, error => {
      this.toastr.error(error.error.message);
    })
  }



  changeMarksValidation(value, controlName) {
    this.addForm.get(controlName).clearValidators();
    if (value == 'Percentage') {
      this.addForm.get(controlName).setValidators([Validators.required, Validators.pattern('(^100(\\.0{1,2})?$)|(^([0-9]([0-9])?|0)(\\.[0-9]{1,2})?$)')]);

    } else if (value == 'CGPA') {
      this.addForm.get(controlName).setValidators([Validators.required, Validators.pattern('(^10(\\.0{1,2})?$)|(^(([0-9])?|0)(\\.[0-9]{1,2})?$)')])
    } else {

    }
    //  this.addForm.get(controlName).markAsTouched();
    this.addForm.get(controlName).updateValueAndValidity();
  }


  validateExperience(index) {
    this.invalidExperience = true;
    if (this.addForm.get('experience')['controls'][index].controls['organization'].valid &&
      this.addForm.get('experience')['controls'][index].controls['from'].valid &&
      this.addForm.get('experience')['controls'][index].controls['to'].valid &&
      this.addForm.get('experience')['controls'][index].controls['techStack'].valid) {
      this.invalidExperience = false;
    }
  }



}
