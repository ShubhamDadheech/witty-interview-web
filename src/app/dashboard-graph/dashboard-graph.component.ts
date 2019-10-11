import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { moment } from 'fullcalendar';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.scss']
})
export class DashboardGraphComponent implements OnInit {
  data: any;
  options: any;
  dateForm: FormGroup;
  obj: any
  timePeriod;
  todayDate;
  descriminatorValue: string;
  showGraph: boolean = true;
  candidatesData: any;
  constructor(private fb: FormBuilder, private httpService: HttpService,private router: Router) {
    this.todayDate = new Date();
  }

  ngOnInit() {
    this.lodaDataForm();

    this.options = {
      title: {
        display: true,
        text: '  ',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };


    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"));

    this.httpService.callApi('graphCount', { params: this.timePeriod }).subscribe((response => {
      this.obj = response;
      this.setValue(this.obj);
    }), (error) => {
  
    })



  }

  setValue(obj) {



    this.data = {
      labels: ['Did not Appear', 'Joined', 'Next Round', 'Offer Placed', 'Rejected', 'Scheduled'],
      datasets: [
        {
          data: [obj.DidNotAppear, obj.Joined, obj.NextRound, obj.OfferPlaced, obj.Rejected, obj.Scheduled],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AACE56",
            "#BB7756",
            "#CC1156",

          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AACE56",
            "#BB7756",
            "#CC1156",

          ]
        }]
    };


  }

  lodaDataForm() {
    this.dateForm = this.fb.group({
      from: [this.todayDate],
      to: [this.todayDate]
    });
  }

  selectData(event) {
 
    let value;
    this.showGraph = !this.showGraph;
    switch (event.element._index) {
      case 0: {
        value = "Did Not Appear";
        break;
      }
      case 1: {
        value = "Joined"; 
       break;
      }
      case 2: {
        value = "Next Round";
        break;
      }
      case 3: {
        value = "Offer Placed";
        break;
      }
      case 4: {
        value = "Rejected";
        break;
      }
      case 5: {
        value = "Scheduled";
        break;
      }
      default: {
        value = null;
        break;
      }
    }

    this.descriminatorValue = value;
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('descriminator', this.descriminatorValue);

    this.httpService.callApi('graphData', { params: this.timePeriod }).subscribe((response => {
      this.candidatesData = response;
    }), (error) => {
    });

  }


  apply() {
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('descriminator', this.descriminatorValue);
  
      this.httpService.callApi('graphCount', { params: this.timePeriod }).subscribe((response => {
      this.obj = response;
      this.setValue(this.obj);

    }), (error) => {
    });

    if (!this.showGraph) {
      this.timePeriod.set('descriminator', this.descriminatorValue);
      this.httpService.callApi('graphData', { params: this.timePeriod }).subscribe((response => {
        this.candidatesData = response;
      }), (error) => {
      });
    }

  }

  showGraphs() {
    this.showGraph = !this.showGraph;

  }

  openCandidate(id: string) {
    this.router.navigate(['witty/candidate', id]);

  }

}
