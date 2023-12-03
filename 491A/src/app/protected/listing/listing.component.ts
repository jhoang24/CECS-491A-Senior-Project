import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  userMessage: string = '';
  username: any;
  picture: string = "data:image/png;base64,"
  picture1: string = "data:image/png;base64,"
  UUID: any = '1701560450138';
  uuid: string;
  imageUrls: string[] = ['https://picsum.photos/200/300', 'https://picsum.photos/200/301',  'https://picsum.photos/200/302','https://picsum.photos/200/303',];
  currentImage: string = this.imageUrls[0];
  currentImageIndex: number=0;
  listingData: any;

  

  constructor(private http: HttpClient,private auth: AuthService, private listingService: ListingService, private route: ActivatedRoute, private router: Router, private profileService: ProfileService) { 
    this.username = this.auth.getLoggedInUser().username;
    this.uuid = '';
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.UUID = params.uuid;

    if (this.UUID) {
      this.listingService.getListingInfo(this.UUID).subscribe(
        (res) => {
          console.log("Listing Data", res);
          this.listingData = res.listing;
          this.imageUrls = res.image || [];
          this.currentImage = this.imageUrls[0];

          if (this.listingData?.userName?.username) {
            this.profileService.getProfileInfo(this.listingData.userName.username)
              .subscribe((profileRes) => {
                console.log(profileRes);
                this.picture1 = "data:image/png;base64," + profileRes.picture;
              });
          }
        }
      );
    }
  });
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

getUserName(): string {
 return (
    this.listingData?.userName?.username // Access the nested properties with safe navigation (?.)
  ) ?? ''; // Us
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
 navigateToUserAccount(){
  const username = this.listingData.userName.username;
  console.log(username);
  if(username){
    this.router.navigate(['/protected/profile',username])
  }
 }
 navigateToListing(uuid: string): void {
  this.listingService.navigateToListing( uuid);
}

}