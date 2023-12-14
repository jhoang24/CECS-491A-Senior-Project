import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/public/custom-validator';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  success: string | null = null;
  error: string | null = null;

  oldPassword: string = '';
  changeForm = new UntypedFormGroup({
    oldPassword: new UntypedFormControl(null, Validators.required),
    password: new UntypedFormControl(null,Validators.required),
    passwordConfirm: new UntypedFormControl(null, Validators.required)
  },
    {validators: CustomValidators.passwordsMatching}
  )

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
   }

  ngOnInit(): void {
  }
  validateOldPassword(control: UntypedFormControl){
    const inputOldPassword = control.value;
    const isOldPasswordValid = this.authService.checkOldPassword(inputOldPassword);
    return isOldPasswordValid ? null : {invalidOldPassword: true};
  }

  confirm() {
    if (!this.changeForm.valid) {
      return;
    }
    const enteredOldPassword = this.changeForm.get('oldPassword')?.value;
    const newPassword = this.changeForm.get('password')?.value;
    

    //console.log('oldPassword:', oldPassword);
    const token = this.authService.returnToken();
    console.log('Token', token);

    // Call your authentication service to check the old password
    // if (this.authService.checkOldPassword(oldPassword)) {
    //   // Password matches, proceed with updating the password
    //   this.authService.updatePassword(newPassword).pipe(
    //     tap(() => this.router.navigate(['']))
    //   ).subscribe();
    // } else {
    //   // Password doesn't match, handle accordingly (e.g., show error message)
    //   this.error = 'Invalid email address.'
    // }
    }
  }

