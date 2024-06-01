import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationStateService } from '../login/authentication-state.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authenticationStateService: AuthenticationStateService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationStateService.getToken();
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`),
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors here
        if (error.status === 401) {
          this.router.navigate(['']);
        }
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
    // return next.handle(req);
  }
}
