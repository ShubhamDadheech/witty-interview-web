import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { moment } from 'fullcalendar';
import { HttpService } from '../service/http.service';

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
  showGraph: boolean = true;
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.todayDate = new Date();
  }

  ngOnInit() {
    this.lodaDataForm();


    this.data = {
      labels: ['Did not Appear', 'Joined', 'Next Round', 'Offer Placed', 'Rejected', 'Scheduled'],
      datasets: [
        {
          data: [10, 10, 10, 20, 20, 20],
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


    this.options = {
      title: {
        display: true,
        text: 'My Title',
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
      // this.setValue(this.obj);
    }), (error) => {
      console.log(error);
    })

    // this.obj = { Scheduled: 30, Rejected: 10, OfferPlaced: 130, NextRound: 90, Joined: 130, DidNotAppear: 90 };

  }

  setValue(obj) {

    this.data.datasets[0].data[0] = obj.DidNotAppear;
    this.data.datasets[0].data[1] = obj.Joined;
    this.data.datasets[0].data[2] = obj.NextRound;
    this.data.datasets[0].data[3] = obj.OfferPlaced;
    this.data.datasets[0].data[4] = obj.Rejected;
    this.data.datasets[0].data[5] = obj.Scheduled;



  }

  lodaDataForm() {
    this.dateForm = this.fb.group({
      from: [this.todayDate],
      to: [this.todayDate]
    });
  }

  selectData(event) {
    console.log("event ==> " + JSON.stringify(event.element._index));
    let value;
    this.showGraph = !this.showGraph;
    switch (event.element._index) {
      case 0: {
        value = "DidNotAppear";
        console.log("DidNotAppear");
        break;
      }
      case 1: {
        value = "Joined";
        console.log("Joined");
        break;
      }
      case 2: {
        value = "NextRound";
        console.log("NextRound");
        break;
      }
      case 3: {
        value = "OfferPlaced";
        console.log("OfferPlaced");
        break;
      }
      case 4: {
        value = "Rejected";
        console.log("Rejected");
        break;
      }
      case 5: {
        value = "Scheduled";
        console.log("Scheduled");
        break;
      }
      default: {
        value = null;
        console.log("Invalid choice");
        break;
      }
    }
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('discriminator', value);
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset


    this.httpService.callApi('graphData', { params: this.timePeriod }).subscribe((response => {
      console.log("graphData ==> " + JSON.stringify(response));

    }), (error) => {
      console.log(error);
    });

  }


  apply() {
    this.timePeriod = new HttpParams()
      .set('startDate', moment(this.dateForm.get("from").value).tz("Asia/Calcutta").format("YYYY-MM-DD"))
      .set('endDate', moment(this.dateForm.get("to").value).tz("Asia/Calcutta").format("YYYY-MM-DD"));

    this.httpService.callApi('graphCount', { params: this.timePeriod }).subscribe((response => {
      this.obj = response;
      // this.setValue(this.obj);

    }), (error) => {
      console.log(error);
    })

  }

  showGraphs() {
    this.showGraph = !this.showGraph;
  }

}
