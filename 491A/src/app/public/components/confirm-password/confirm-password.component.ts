import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent{
  token!: string;
  email!: string;

  confirmForm = new UntypedFormGroup({
    password: new UntypedFormControl(null,Validators.required),/*  */
    passwordConfirm: new UntypedFormControl(null, Validators.required)
  },
    {validators: CustomValidators.passwordsMatching}
  )


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.email = params.email;
    });
  }
  confirm() {
    if (!this.confirmForm.valid) {
      return;
    }

    const password = this.confirmForm.get('password')?.value;
    this.authService.updatePassword(this.token, this.email, password).pipe(
      tap(() => this.router.navigate (['public/login']))
    ).subscribe();
  }

}


