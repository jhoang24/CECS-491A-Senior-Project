import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  imageUrls: string[] = ['https://picsum.photos/200/300',
  'https://picsum.photos/200/301',
  'https://picsum.photos/200/302',
  'https://picsum.photos/200/303',
  // Add more image URLs as needed
];
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

redirectToMessages() {
  // Use the navigate method to redirect to the messages page
  this.router.navigate(['/protected/messages']);
}

redirectToReport() {
  // Use the navigate method to redirect to the report-listing page
  this.router.navigate(['/protected/report-listing']);
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