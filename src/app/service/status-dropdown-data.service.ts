import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StatusDropdownDataService {
  public statusDropDownData;
  constructor(private httpService: HttpService) {
    this.getStatusDropdownData();
  }

  getStatusDropdownData(callback = null) {
    if (this.statusDropDownData) {
      if (callback) {
        callback(this.statusDropDownData);
      }
      return;
    }
    this.httpService.callApi('StatusDropDownData', {}).subscribe((response => {
      this.statusDropDownData = response;
      if (callback) {
        callback(this.statusDropDownData);
      }
    }), (error) => {
    });
  }
}
