import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListPipe'
})
export class FilterListPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args)
      return value;
      const searchValue = args.toLowerCase();
    return value.filter(
      item => {
        if(item.candidateDto){
          
        }
      }
      
      // item.candidateDto.firstName.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
      //          item.candidateDto.lastName.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
      //          item.candidateDto.email.toLowerCase().indexOf(args.toLowerCase()) > -1
      //         //  item.candidateDto.aadhaarNum.indexOf(args) > -1 ||
      //         //  item.candidateDto.primaryMobileNum.indexOf(args) > -1 
      //      //  item.profile.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
      //         //  item.nextRoundScheduleOn.toLowerCase().indexOf(args) > -1
    );
  }

}

