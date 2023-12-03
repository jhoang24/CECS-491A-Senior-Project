import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  localUsername: any;
  isSmallScreen = false;

  // profilePicture: string;
  // profileInfo: any;
  
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private auth: AuthService) { 
    this.localUsername = this.auth.getLoggedInUser();
    this.username = '';
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.checkScreenSize();
  }

  picture: string = "data:image/png;base64,"

  // If localstorage for picture is empty, then get profile image from backend and store it
   ngOnInit(): void {
    this.checkScreenSize();

    this.route.params.subscribe(params => {
      this.username = params.username; 
      if(this.username == null){
        this.picture += localStorage.getItem("picture")
      } else {
      this.profileService.getProfileInfo(this.username).subscribe(
        (res) => 
        {
          console.log(res);
          this.picture += res.picture;
        }
    )}});
   }  

  checkScreenSize(){
    this.isSmallScreen = window.innerWidth <767;
  }
  

}
