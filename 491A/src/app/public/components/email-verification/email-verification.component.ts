import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { 

  }

  ngOnInit(): void {
  
  }

  emailConfirmation: FormGroup = new FormGroup({
    code: new FormControl(''),
  });

  email = "";

  // Sends post request to confirm-email backend with email and token and navigates back to login page.
  confirmEmail(): void {
    this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/confirm-email", {"email":this.email, "token": this.emailConfirmation.get('code')?.value}).subscribe(
        (res) => {
          console.log(res)
          this.router.navigate(['/public/login'])

        },
        (error) =>{
          console.log(error)
        }
    )
  }
}
