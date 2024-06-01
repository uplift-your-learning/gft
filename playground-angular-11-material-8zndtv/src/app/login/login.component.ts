import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { take } from 'rxjs/operators';
import { LoginResponse } from '../entities/LoginDetails.interface';
import { Router } from '@angular/router';
import { AuthenticationStateService } from './authentication-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  displayErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authenticationStateService: AuthenticationStateService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('token');
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginService
      .loginUser(this.loginForm.getRawValue())
      .pipe(take(1))
      .subscribe(
        (loginResponse: LoginResponse) => {
          if (loginResponse.user) {
            this.authenticationStateService.setToken(loginResponse.token);
            this.router.navigate(['/party-details']);
          } else {
            this.displayErrorMessage = true;
          }
        },
        (err) => {
          this.displayErrorMessage = true;
        }
      );
  }
}
