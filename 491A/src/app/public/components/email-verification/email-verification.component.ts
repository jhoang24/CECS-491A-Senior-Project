import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });
}
