import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
//APP
import { AuthenticationService } from '../auth/authentication.service'

@Component({
  selector: 'menu-comp',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {

  anon: boolean = true;
  investor: boolean = false;
  admin: boolean = false;
  saler: boolean = false;
  buyer: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Init menu');
    if (this.authService.currentUserValue) {
      this.admin = this.authService.currentUserValue.isAdmin;
      this.investor = !this.admin;
      this.anon = false;
    }
    else
      this.anon = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 
