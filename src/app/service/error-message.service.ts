import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  emailPattern: string;
  requireField: string;
  mobileNumberLength: string;
  mobileNumberPattern: string;
  aadharNumberLength: string;
  constructor() {

    this.emailPattern = "Email must be a valid email address.";
    this.requireField = "This field is required.";
    this.mobileNumberLength = "Mobile number must be 10 digits.";
    this.mobileNumberPattern = "Invalid number.";
    this.aadharNumberLength = "Aadhar number must be 12 digits.";
  }
}
