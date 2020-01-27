import { Component, OnInit } from '@angular/core';

//app
import { UserService } from './shared/user.service'

@Component({
    
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    
  }

}
