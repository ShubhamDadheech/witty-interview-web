import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCandidate'
})
export class FilterCandidatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    const searchValue = args.toLowerCase();
    return value.filter(
      item => {

        if (item.firstName) {
          if (item.firstName.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.lastName) {
          if (item.lastName.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.email) {
          if (item.email.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.profile) {
          if (item.profile.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.primaryMobileNum) {
          if (item.primaryMobileNum.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.aadhaarNum) {
          if (item.aadhaarNum.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

        if (item.gender) {
          if (item.gender.toLowerCase().indexOf(searchValue) > -1) {
            return true;
          }
        }

      });
    
  }

}
