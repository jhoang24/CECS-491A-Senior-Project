import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //user: any;
  name: string = '';
  bio: string = '';
  email: string = '';
  phone: string = '';
  profilePicture: string | ArrayBuffer | null = null; // Hold the selected image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   //default data for testing
   this.name = 'John Doe';
    this.bio = 'A passionate user of OfferUp.';
    this.email = 'john@example.com';
    this.phone = '123-456-7890';
  }

  saveProfile(){
    console.log('Profile changes saved ',{ 
      name: this.name, 
      bio: this.bio, 
      email: this.email, 
      phone: this.phone,
      profilePicture: this.profilePicture,});
  }

}
