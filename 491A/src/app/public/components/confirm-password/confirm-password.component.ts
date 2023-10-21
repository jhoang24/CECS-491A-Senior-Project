import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent{

  confirmForm = new FormGroup({
    password: new FormControl(null,Validators.required),
    passwordConfirm: new FormControl(null, Validators.required)
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
  confirm() {
    if (!this.confirmForm.valid) {
      return;
    }

    const password = this.confirmForm.get('password')?.value;
    this.authService.updatePassword(this.confirmForm.value).pipe(
      tap(() => this.router.navigate (['public/login']))
    ).subscribe();
  }

}


