import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';


import { AuthenticationService } from './authentication.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.token) {

      req = req.clone({ setHeaders: { Authorization: "Bearer " + currentUser.token } });
      
    }

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));
      }
    });
  }

}
