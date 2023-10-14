import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  constructor(private profileService: ProfileService) {}

  picture: string = "data:image/png;base64,"

  // If localstorage for picture is empty, then get profile image fromand store it
   ngOnInit(): void {
     if (localStorage.getItem("picture")  == null){
       this.profileService.getProfileInfo()
       .subscribe(
         (res) => 
         {
           localStorage.setItem("picture", res.picture)
           this.picture += localStorage.getItem("picture")
         }
       );
     }
     else {
       this.picture += localStorage.getItem("picture")
     } 
   }  

}
