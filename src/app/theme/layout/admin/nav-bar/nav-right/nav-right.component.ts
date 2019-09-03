import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  userData:any;

  constructor(config: NgbDropdownConfig, private httpService: HttpService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  ngOnInit() {
    let userEmail = sessionStorage.getItem('email');
    this.httpService.callApi('getLogedinUserByEmail', {pathVariable: userEmail}).subscribe((response) => {
      console.log('user detail ==> ' + JSON.stringify(response));
      this.userData = response.firstName+" "+response.lastName;
    }, error => {

    })

  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  logout(){
    console.log("Inside logout");
    
    this.httpService.logout();
  }
}
