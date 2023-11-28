import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  userMessage: string = '';
  username: any;
  UUID: any = 1700950333172;
  imageUrls: string[] = ['https://picsum.photos/200/300',
  'https://picsum.photos/200/301',
  'https://picsum.photos/200/302',
  'https://picsum.photos/200/303',
  // Add more image URLs as needed
];
  currentImage: string = this.imageUrls[0];
  currentImageIndex: number=0;
  listingData: any;

  constructor(private http: HttpClient,private auth: AuthService, private listingService: ListingService) { 
    this.username = this.auth.getLoggedInUser().username;
  }

  ngOnInit(): void {
  this.listingService.getListingInfo(this.UUID).subscribe(
    (res) => {
      console.log("Listing Data", res)
      this.listingData = res;
    }
  )
}

nextImage() {
  console.log('Next Image Clicked');
  this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
  this.currentImage = this.imageUrls[this.currentImageIndex];
}

prevImage() {
  console.log('Previous Image Clicked');
  this.currentImageIndex = (this.currentImageIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
  this.currentImage = this.imageUrls[this.currentImageIndex];
}

selectImage(index: number){
  this.currentImageIndex = index;
  this.currentImage = this.imageUrls[index];
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