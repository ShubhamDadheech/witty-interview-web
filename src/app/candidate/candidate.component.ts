import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OptionsInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpService } from '../service/http.service';
import { HttpParams } from '@angular/common/http';
import { moment } from 'fullcalendar';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  options: OptionsInput;
  events: any[];
  todayDate = new Date();
  eventsModel: any;
  paramData;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {

    this.paramData = new HttpParams()
      .set('date', moment(this.todayDate).tz("Asia/Calcutta").format("YYYY-MM-DD"));
    // .set('disciminator', "month");

    this.httpService.callApi('dashboardData', { params: this.paramData }).subscribe((response) => {
      this.events = response;
    }, error => {

    })


    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          themeIcon: 'green',
          click: function () {
            alert('clicked the custom button!');
          }
        }

      },
      header: {
        left: 'prev,next ',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'dayGridMonth'
    };



    // $('body').on('click', 'button.fc-prev-button', function () {
    //   //do something
    //   alert('prev is clicked, do something');

    //   // console.log(this.todayDate);

    // });

    // $('body').on('click', 'button.fc-next-button', function () {
    //   //do something
    //   alert('next is clicked, do something');
    // });
  }





  eventClick(model) {
    console.log(model.event.id);
    this.router.navigate(['candidate', model.event.id]);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }

}