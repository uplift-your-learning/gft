import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationStateService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
