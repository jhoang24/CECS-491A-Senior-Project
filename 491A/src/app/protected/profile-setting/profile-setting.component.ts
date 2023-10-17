import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})

export class ProfileSettingComponent implements OnInit {
  
  username: any;
  profilePicture: string | ArrayBuffer | null = null; 

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.picture = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  constructor(private router:Router, private profileService: ProfileService, private auth: AuthService) {
    this.username = this.auth.getLoggedInUser().username;
  }

  picture: string = "data:image/png;base64,"

  // If localstorage for picture is empty, then get profile image fromand store it
   ngOnInit(): void {
      this.picture += localStorage.getItem("picture")
   }  

  saveProfile(){
      // Remove the prefix by extracting the substring starting from the length of the prefix
    const localImage = this.picture.replace(/data:image\/png;base64,/g, "");
    localStorage.setItem("picture", localImage)    
    this.profileService.saveProfilePicture(this.username, this.picture).subscribe(
      (res) => 
      {
      }
  )
  }

  logout() {
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    localStorage.removeItem("picture");
    this.router.navigate(['../../']);
  }

}