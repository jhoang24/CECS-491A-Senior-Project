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

  constructor(private http: HttpClient,private auth: AuthService) { 
    this.username = this.auth.getLoggedInUser().username;
  }

  ngOnInit(): void {

    const invokeButton = document.getElementById('invokeButton');

if (invokeButton) {
  invokeButton.addEventListener('click', () => {
    fetch('https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from your Lambda function here
        console.log(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  });
} else {
  console.error("Element with ID 'invokeButton' not found.");
}

// Send request to api gateway
}

sendEmail() {
  const apiGatewayUrl = 'https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/send-email';

  // You can pass any necessary data to your Lambda function as a request payload.
  const requestData = {
    recipientEmail: 'ale21100@gmail.com',
    subject: 'Subject',
    message: this.userMessage,
    sourceEmail: this.username,
  };

  this.http.post(apiGatewayUrl, requestData).subscribe(
    (response) => {
      // Handle success, e.g., show a success message to the user
      console.log('Email sent successfully', response);
    },
    (error) => {
      // Handle error, e.g., show an error message to the user
      console.error('Email send failed', error);
    }
  );

}
}