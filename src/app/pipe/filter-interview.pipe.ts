import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'filterInterview'
})
export class FilterInterviewPipe implements PipeTransform {

  transform(value: any, args?: any, roundKey?: any): any {
    if (!args)
      return value;
    const searchValue = args.toLowerCase();
    return value.filter(
      item => {
        if (item.candidateDto) {
          if (item.candidateDto.email) {
            if (item.candidateDto.email.toLowerCase().indexOf(searchValue) > -1) {
              return true;
            }
          }
          if (item.candidateDto.firstName) {
            if (item.candidateDto.firstName.toLowerCase().indexOf(searchValue) > -1) {
              return true;
            }
          }
          if (item.candidateDto.aadhaarNum) {
            if (item.candidateDto.aadhaarNum.toLowerCase().indexOf(searchValue) > -1) {
              return true;
            }
          }
          if (item.candidateDto.primaryMobileNum) {
            if (item.candidateDto.primaryMobileNum.toLowerCase().indexOf(searchValue) > -1) {
              return true;
            }
          }

          if (item.candidateDto.lastName) {
            if (item.candidateDto.lastName.toLowerCase().indexOf(searchValue) > -1) {
              return true;
            }
          }


        }

        if (item.profile) {
          if (item.profile.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }
        if (item.nextRoundScheduleOn) {
          let date = moment.tz(new Date(item.nextRoundScheduleOn), "Asia/Calcutta").format("DD/MM/YYYY hh:mm a")
          if (date.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }
        if (item.scheduledDate) {
          let date = moment.tz(new Date(item.scheduledDate), "Asia/Calcutta").format("dd/MM/yyyy hh:mm a")
          if (date.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item[roundKey]) {
          if (item[roundKey].toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }
        return false;
      }

    );
  }

}
