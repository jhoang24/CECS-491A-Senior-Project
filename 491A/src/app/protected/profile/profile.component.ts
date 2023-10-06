import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfileInfo();
  }

  get picture() {
    return "data:image/png;base64," + this.profileService.profilePicture;
  }
  


}
