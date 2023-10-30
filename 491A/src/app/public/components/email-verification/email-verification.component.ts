import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  token = "";
  email = "darian.chieng01@student.csulb.edu";

  confirmEmail(): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/confirm-email",{"email":this.email, "token":this.token})

  }
}
