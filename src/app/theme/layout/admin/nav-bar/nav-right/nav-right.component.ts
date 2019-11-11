import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  userData: any;
  user: any;

  constructor(config: NgbDropdownConfig, private httpService: HttpService, private router: Router) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;

    let userEmail = sessionStorage.getItem('email');
    this.httpService.callApi('getLogedinUserByEmail', { pathVariable: userEmail }).subscribe((response) => {
      this.user = response;
      this.userData = this.user.firstName + " " + this.user.lastName;
      sessionStorage.setItem('admin', response.admin);
    }, error => {

    })

  }

  ngOnInit() {


  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  logout() {
    this.httpService.logout();
  }

  profile() {
    // witty/user-profile
    this.router.navigate(['witty/user-profile']);
  }

}





