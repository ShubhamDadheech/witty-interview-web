import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-candidate',
  templateUrl: './all-candidate.component.html',
  styleUrls: ['./all-candidate.component.scss']
})
export class AllCandidateComponent implements OnInit {

  candidates: any = [];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  this.getAllCandidate();
  }


  getAllCandidate() {

    this.httpService.callApi('getCandidates', {}).subscribe((response) => {
      this.candidates = response;

    }, error => {

    })

  }

  openCandidate(id: string) {
    this.router.navigate(['witty/candidate', id]);

  }

  newCandidate() {
    this.router.navigate(['witty/add-candidate']);

  }

}
