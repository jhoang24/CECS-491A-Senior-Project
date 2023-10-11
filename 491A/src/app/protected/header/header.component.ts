import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  enteredButton = false;
  isMatMenuOpen = false;


  constructor(private router:Router, private profileService: ProfileService) { 
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo();
  }

  // Since profileData's fields are initialized as empty, this get function will update this.profileData.picture after the http post request
  get picture() {
    return "data:image/png;base64," + this.profileService.profilePicture;
  }
  
  
  logout(): void{
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    this.router.navigate(['../../']);
  }

  menuenter() {
    this.isMatMenuOpen = true;
  }

  menuLeave(trigger: any) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  buttonEnter(trigger: any) {
    setTimeout(() => {
        trigger.openMenu();
    })
  }

  buttonLeave(trigger: any) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100)
  }
    
}
