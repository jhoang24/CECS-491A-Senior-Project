import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  error: string | null = null;
  success: string | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router, private authService: AuthService ) {
    this.emailForm=this.fb.group({
     email: new FormControl('', [Validators.required, Validators.email]),
      // emailSubject: ['', Validators.required],
      // emailMessage: ['', Validators.required],
    });
  }

  sendEmail() {
    if( (this.emailForm.valid)){
      const emailData = this.emailForm.value;
      
      this.success = 'Email sent!';
      
      this.emailForm.reset();

      console.log(emailData);

      this.authService.sendPasswordToken(emailData.email).pipe(
        tap(() => this.router.navigate (['public/login']))
      ).subscribe();

    }
    else{
      this.error = 'Invalid email address.'
    }
  }

  ngOnInit(): void {
  }
}

