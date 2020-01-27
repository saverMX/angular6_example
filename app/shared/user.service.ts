import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { catchError } from 'rxjs/operators'

import { BaseService } from './base.service';
import { APP_DI_CONFIG } from './app.config';
import { User } from './user';


@Injectable()
export class UserService extends BaseService {

    constructor(private http: HttpClient) {
        super();
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(APP_DI_CONFIG.url + APP_DI_CONFIG.api + "User/GetUser/"+id)
      .pipe(catchError(this.handleError("getUser", null)));
  }

    getUserAll(): Observable<User[]> {
      return this.http.get<User[]>(APP_DI_CONFIG.url + "api/User/GetAll")
        .pipe(catchError(this.handleError("getUserLogged", null)));
    }

  getMenuUser(): Observable<string[]> {
        return this.http.get<string[]>(APP_DI_CONFIG.url + "api/User/MenuUser")
          .pipe(catchError(this.handleError("getMenuUser", [])));
    }

  getInvestors(): Observable<User[]> {
    return this.http.get<User[]>(APP_DI_CONFIG.url + "api/User/GetInvestors")
      .pipe(catchError(this.handleError("getInvestors", [])));
  }

  validateReference(ref: string): Observable<User> {
    return this.http.get<User>(APP_DI_CONFIG.url + "api/User/ValidReference?user=" + ref);
  }
}
