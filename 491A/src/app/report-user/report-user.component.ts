// report-user.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent {
  reportReason: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  submitReport() {
    // Check if a reason is provided
    if (!this.reportReason.trim()) {
      this.snackBar.open('Please provide a reason for reporting the user.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Make an HTTP request to your Lambda function
    const lambdaEndpoint = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/report-user'; 

    const reportData = {
      reason: this.reportReason,
      subject: 'User Report'
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
