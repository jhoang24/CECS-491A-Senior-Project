import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  // profilePicture: string;
  // profileInfo: any;
  
  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
    this.username = '';
  }

  picture: string = "data:image/png;base64,"

  // If localstorage for picture is empty, then get profile image fromand store it
   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params.username;
      this.profileService.getProfileInfo(this.username).subscribe(
        (res) => 
        {
          this.picture += res.picture;
        }
    )});
   }  
  

}
