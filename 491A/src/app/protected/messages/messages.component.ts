import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  userMessage: string = '';
  username: any;
  picture: string = "data:image/png;base64,";
  messageSent: boolean = false;  // New variable to track whether the message is sent
  listingUsername: any;
  listingUuid: any;

  constructor(private http: HttpClient, private auth: AuthService, private listingService: ListingService, private route: ActivatedRoute) {
    this.username = this.auth.getLoggedInUser().username;

    // Gets the current listing's username
    this.listingService.getCurrentListingUsername().subscribe(
      (listingUsername) => {
        this.listingUsername = listingUsername;
      }
    );

     // Gets the current listing's username
    this.listingService.getCurrentListingUuid().subscribe(
      (listingUuid) => {
        this.listingUuid = listingUuid;
      }
    );
  }

  ngOnInit(): void {
    console.log('Listing Username:', this.listingUsername);
  }

  sendEmail() {
    const apiGatewayUrl = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/send-email';
  
    const requestData = {
      recipientEmail: this.listingUsername,
      subject: "ResellU User: " + this.username + " | Wants to Buy Your Item",
      message: this.userMessage,
      sourceEmail: this.username, // Uses the logged in username and sends it to lambda to get email of specific user
      listingUuid: this.listingUuid
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