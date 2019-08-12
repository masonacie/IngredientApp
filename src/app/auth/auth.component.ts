import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth-service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  isLoginMode = true; 
  isLoading = false;
  error: string = null;


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;


    this.isLoading = true

    if (this.isLoginMode) {
        authObs = this.authService.signIn(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false
        this.router.navigate(['./recipes'])
      },
      errorMessage => {
        this.error = errorMessage
        this.isLoading = false
      })


    form.reset();
  }

}
