import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  userMessage: string = '';
  username: any;
  picture: string = "data:image/png;base64,"
  UUID: any = '1700950333172';
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

  constructor(private http: HttpClient,private auth: AuthService, private listingService: ListingService, private route: ActivatedRoute, private router: Router) { 
    this.username = this.auth.getLoggedInUser().username;
    this.uuid = '';
  }

//connects to specific listing with uuid:1700950333172
  ngOnInit(): void {
  this.listingService.getListingInfo(this.UUID).subscribe(
    (res) => {
      console.log("Listing Data", res)
      this.listingData = res.listing;
      this.imageUrls = res.image || []; // Use the image property for images, default to an empty array if null
      this.currentImage = this.imageUrls[0]; // Set the i
    }
  )
}

// ngOnInit(): void {
//   this.route.params.subscribe(params => {
//     this.uuid = params.uuid; 
//     if(this.uuid== null){
//       this.picture += localStorage.getItem("picture")
//     } else {
//     this.listingService.getListingInfo(this.uuid).subscribe(
//       (res) => 
//       {
//          console.log("Listing Data", res)
//       this.listingData = res.listing;
//       this.imageUrls = res.image || []; // Use the image property for images, default to an empty array if null
//       this.currentImage = this.imageUrls[0]; // Set the i
//       }
//   )}});
// }

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

}