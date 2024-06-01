import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../entities/LoginDetails.interface';
import { baseUrl } from '../entities/CommonUtils';

@Injectable()
export class LoginService {
  baseUrl = baseUrl;
  constructor(private http: HttpClient) {}

  loginUser(loginDetails: LoginDetails) {
    return this.http.post(this.baseUrl + '/login/', loginDetails);
  }
}
