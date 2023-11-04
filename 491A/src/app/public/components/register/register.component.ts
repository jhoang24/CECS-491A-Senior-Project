import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  csulbEmailValidator(control: AbstractControl) {
    const email = control.value as string;
  
    if (email && !email.toLowerCase().endsWith('csulb.edu')) {
      return { csulbEmail: true }; // Return a validation error
    }
  
    return null; // No validation error
  }

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, this.csulbEmailValidator]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      switchMap(() => {
        // The registration was successful, now send a valid email
        return this.authService.sendValidEmail(this.registerForm.value.email);
      }),
      // After sending the valid email, navigate to the login route
      tap(() => this.router.navigate(['/public/email-verification']))
    ).subscribe();
  }

}
