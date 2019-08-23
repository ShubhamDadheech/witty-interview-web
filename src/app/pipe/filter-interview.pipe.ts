import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInterview'
})
export class FilterInterviewPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args)
    return value;
  return value.filter(
    item => item.candidateDto.email.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
     item.candidateDto.firstName.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
      item.candidateDto.aadhaarNum.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
       item.candidateDto.primaryMobileNum.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
       item.candidateDto.lastName.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
       item.profile.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
       item.roundDate.toLowerCase().indexOf(args.toLowerCase()) > -1
  );
  }

}
