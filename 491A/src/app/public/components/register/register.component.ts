import { UntypedFormGroup, UntypedFormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  csuEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value as string;
  
    // Check if the email ends with csu.edu or any subdomain under csu.edu
    const csuEmailRegex = /csu[a-z0-9.-]*\.edu$/i;
    if (email && !csuEmailRegex.test(email)) {
      return { csuEmail: true }; // Return a validation error
    }
  
    return null; // No validation error
  }

  registerForm = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email, this.csuEmailValidator]),
    username: new UntypedFormControl(null, [Validators.required]),
    firstname: new UntypedFormControl(null, [Validators.required]),
    lastname: new UntypedFormControl(null, [Validators.required]),
    password: new UntypedFormControl(null, [Validators.required]),
    passwordConfirm: new UntypedFormControl(null, [Validators.required])
  },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
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
      tap(() => {
        this.router.navigate(['/public/email-verification'], {queryParams: {email: this.registerForm.value.email}})
      })
    ).subscribe();

  }

}
