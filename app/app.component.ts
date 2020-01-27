import { Component,OnInit } from '@angular/core';

//Service
import { AuthenticationService } from './auth/authentication.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit
{

  ngOnInit() {
    
  }
}
