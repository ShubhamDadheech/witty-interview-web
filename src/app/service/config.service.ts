import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  HOST: string;
  PORT: string;
  
  constructor() {

  //  this.HOST = '192.168.1.43';
  //  this.HOST = '192.168.1.40';
  //  this.HOST = 'localhost';
    //this.HOST = '192.168.1.163';
      // this.HOST = 'localhost';
     this.HOST = '192.168.1.217';
    // this.PORT = '9093';
    this.PORT = '7070';

     
  }
}
