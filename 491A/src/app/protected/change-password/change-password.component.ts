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
  username: any;
  passwordMatch: boolean = false;
  changeForm = new UntypedFormGroup({
    oldPassword: new UntypedFormControl(null, Validators.required),
    password: new UntypedFormControl(null,Validators.required),
    passwordConfirm: new UntypedFormControl(null, Validators.required)
  },
    {validators: CustomValidators.passwordsMatching}
  )

  constructor(
    private router: Router,
    private authService: AuthService, 
    
  ) {
   }

  ngOnInit(): void {
    this.username = this.authService.getLoggedInUser().username;
  }


  confirm() {
    if (!this.changeForm.valid) {
      return;
    }
    this.authService.changePassword(this.username, this.changeForm.value.oldPassword, this.changeForm.value.passwordConfirm)
    .subscribe(
      () => {
        this.success = 'Password changed successfully';
        this.error = null;
      },
      (error) => {
        if (error.status === 403) {
          this.success = null;
          this.error = 'Incorrect old password. Please try again.';
        } else {
          this.success = null;
          this.error = 'Failed to change password. Please try again later.';
        }
      }
      
    );
  }
  }

