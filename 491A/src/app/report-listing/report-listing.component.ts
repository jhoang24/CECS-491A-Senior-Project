// report-listing.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsernameService } from '../protected/services/username.service';

@Component({
  selector: 'app-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.scss']
})
export class ReportListingComponent {
  reportReason: string = '';
  selectedOption: string = '';
  username: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.usernameService.getUsername().subscribe(username => {
      console.log('Username received:', username);
      this.username = username;
    });
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  submitReport() {
    // Check if an option is selected
    if (!this.selectedOption) {
      this.snackBar.open('Please select a reporting option.', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Check if a reason is provided
    if (!this.reportReason.trim()) {
      this.snackBar.open('Please provide a reason for reporting the listing.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const reportSubject = this.username ? `Listing Report: ${this.username}` : 'Listing Report';

    // Make an HTTP request to your Lambda function
    const lambdaEndpoint = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/report-user'; 

    const reportData = {
      reason: "Option Selected: " + this.selectedOption + '\n\nMore Details:' + this.reportReason,
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
