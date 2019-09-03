import { Injectable } from '@angular/core';
import { ConfigService } from './config.service'


@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  urlObject: any;
  constructor(configService: ConfigService) {


    let urlString = 'http://' + configService.HOST + ':' + configService.PORT + '/wims/';



    this.urlObject = {
      'login': {
        'method': 'POST',
        'url': urlString + 'oauth/token'
      },
      'logout': {
        'method': 'POST',
        'url': urlString + 'user/logout'
      },

      'getInterviews': {
        'method': 'GET',
        'url': urlString + 'interview/on-today'
      },
      'getCandidates': {
        'method': 'GET',
        'url': urlString + 'candidate'
      },
      'getCandidateById': {
        'method': 'GET',
        'url': urlString + 'candidate/id/'
      },
      'checkCandidate': {
        'method': 'GET',
        'url': urlString + 'candidate/search'
      },
      'createOrUpdateCandidate': {
        'method': 'POST',
        'url': urlString + 'candidate'
      },
      'getInterviewById': {
        'method': 'GET',
        'url': urlString + 'interview/'
      },
      'SaveOrUpdateInterview': {
        'method': 'POST',
        'url': urlString + 'interview'
      },
      'deleteInterview': {
        'method': 'DELETE',
        'url': urlString + 'interview/'
      },
      'todayInterview': {
        'method': 'GET',
        'url': urlString + 'interview/on-today'
      },
      'interviewBetweenTwoDate': {
        'method': 'GET',
        'url': urlString + 'interview/upcoming'
      }, 'doneInterviewBetweenTwoDate': {
        'method': 'GET',
        'url': urlString + 'interview/completed'
      },
      'StatusDropDownData': {
        'method': 'GET',
        'url': urlString + 'interview/candidate-status'
      },
      'getLogedinUserByEmail': {
        'method': 'GET',
        'url': urlString + 'user/email/'
      },
      'dashboardData': {
        'method': 'GET',
        'url': urlString + 'interview/dashboard'
      },

    }
  }
}

