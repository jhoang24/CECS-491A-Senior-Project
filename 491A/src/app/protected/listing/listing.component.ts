import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  userMessage: string = '';
  username: any;
  messageSent: boolean = false;  // New variable to track whether the message is sent

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.username = this.auth.getLoggedInUser().username;
  }

  ngOnInit(): void {
    
  }

sendEmail() {
  const apiGatewayUrl = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/send-email';

  const requestData = {
    recipientEmail: 'ale21100@gmail.com',
    subject: 'Subject',
    message: this.userMessage,
    sourceEmail: this.username,
  };

  this.http.post(apiGatewayUrl, requestData).subscribe(
    (response) => {
      console.log('Email sent successfully', response);
      this.userMessage = '';  // Clear the userMessage
      this.messageSent = true;  // Set messageSent to true
      setTimeout(() => {
        this.messageSent = false;  // Clear the message after a delay (e.g., 3 seconds)
      }, 3000);
    },
    (error) => {
      console.error('Email send failed', error);
    }
  );
}
}