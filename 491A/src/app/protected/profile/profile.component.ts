import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  name: string = '';
  profilePicture: string | ArrayBuffer | null = null; 

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

  constructor(private router:Router) {}

  ngOnInit(): void {
   //default data for testing
   this.name = 'Tony Hawk';
  }

  saveProfile(){
    console.log('Profile changes saved ',{ 
      name: this.name, 
      profilePicture: this.profilePicture,});
  }

  logout() {
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    this.router.navigate(['../../']);
  }

}
