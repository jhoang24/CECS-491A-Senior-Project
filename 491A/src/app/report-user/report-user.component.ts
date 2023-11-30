// report-user.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsernameService } from '../protected/services/username.service';


@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent {
  reportReason: string = '';
  username: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.usernameService.getUsername().subscribe(username => {
      console.log('Username received:', username);
      this.username = username;
    });
  }

  submitReport() {
    // Check if a reason is provided
    if (!this.reportReason.trim()) {
      this.snackBar.open('Please provide a reason for reporting the user.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const reportSubject = this.username ? `User Report: ${this.username}` : 'User Report';

    // Make an HTTP request to your Lambda function
    const lambdaEndpoint = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/report-user'; 

    const reportData = {
      reason: this.reportReason,
      subject: reportSubject,
    };

    this.http.post(lambdaEndpoint, reportData).subscribe(
      () => {
        this.snackBar.open('Report submitted successfully.', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error submitting report:', error);
        this.snackBar.open('Failed to submit report. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
