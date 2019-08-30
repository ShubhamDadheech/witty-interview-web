import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  HOST: string;
  PORT: string;
  
  constructor() {

  //  this.HOST = '192.168.1.40';
   this.HOST = '192.168.1.37';
  //  this.HOST = 'localhost';
    //this.HOST = '192.168.1.163';
      // this.HOST = 'localhost';
    //  this.HOST = '192.168.1.210';
    this.PORT = '9093';
    // this.PORT = '8999';

     
  }
}
