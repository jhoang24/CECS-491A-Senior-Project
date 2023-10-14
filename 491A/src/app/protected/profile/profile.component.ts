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

  ngOnInit(): void {
    this.profileService.getProfileInfo()
    .subscribe(
      res => this.picture += res.picture
    );
  
  }  

}
