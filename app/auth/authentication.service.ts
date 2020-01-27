import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { User } from '../shared/user'
import { inherits } from 'util';
import { BaseService } from '../shared/base.service';
import { APP_DI_CONFIG } from '../shared/app.config'


@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<any>(
      "api/User/Authenticate",
      { username, password },
      { headers: this.headers }).
      pipe(map(user => {
        console.log('After login:');
        

        if (user !== null) {
          console.log(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: User ) : Observable<any> {
    return this.http.post("api/User/Register", JSON.stringify(user), { headers: this.headers });
      
  }

}

