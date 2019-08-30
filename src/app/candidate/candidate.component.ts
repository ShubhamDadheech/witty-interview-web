import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OptionsInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';



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
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  constructor() { }

  ngOnInit() {
    // this.options = {
    //   plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //   defaultDate: this.todayDate,
    //   header: {
    //     left: 'prev,next',
    //     center: 'title',
    //     right: 'dayGridMonth,dayGridWeek,dayGridDay'
    //   },
    //   editable: true,
    // };

    let a = [
      {
        "id": 1,
        "name": "shubham",
        "date": "2019-08-04",
        "status": true

      },
      {
        "id": 2,
        "name": "shubham",
        "date": "2019-08-14",
        "status": false

      },
      {
        "id": 3,
        "name": "shubham",
        "date": "2019-08-03",
        "status": true

      }, {
        "id": 4,
        "name": "shubham",
        "date": "2019-08-05",
        "status": false

      }
    ]
    for (let i = 0; i < a.length; i++) {

    }

    this.events = [
      { title: 'event 1', date: '2019-08-01T18:26:52.173+05:30', color: 'green', textColor: 'yellow' },
      { title: 'event 2', date: '2019-08-06T18:26:52.173+05:30', color: 'black', textColor: 'yellow' }
    ];

    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      plugins: [dayGridPlugin, interactionPlugin]
    };


  }


  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }

}