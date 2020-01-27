import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { UserService } from '../shared/user.service'
import { AuthenticationService } from '../auth/authentication.service'
import { User } from '../shared/user';

@Component({
  templateUrl: 'register.component.html',
   selector: 'register'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorRef = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/']);

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      reference: ['', null],
      
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid && !this.errorRef)
      return;

    this.loading = true;

    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error en registrar usuario');
          this.loading = false;
          this.submitted = false;
        });
  }

  validateReference(ref: string) {
    
    if (ref) {
      this.userService.validateReference(ref)
        .subscribe({
          next: x => {
            this.errorRef = false;
          },
          error: err => {
            this.errorRef = true;
            console.log('error al validar referencia');
            console.log(err);
          }
        });
    }
    else
      this.errorRef = false;

  }
}
