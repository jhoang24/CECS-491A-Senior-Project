import { Component, OnChanges, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  enteredButton = false;
  isMatMenuOpen = false;
  user: any;
  isSmallScreen = false;
  opened = false;


  constructor(private router:Router, private profileService: ProfileService, private auth: AuthService) { 
    this.user = this.auth.getLoggedInUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.checkScreenSize();
  }


 picture: string = "data:image/png;base64,"

 // If localstorage for picture is empty, then get profile image from backend and store it
  ngOnInit(): void {
    this.checkScreenSize();

    if (localStorage.getItem("picture")  == null){
      this.profileService.getProfileInfo(this.user.username)
      .subscribe(
        (res) => 
        {
          localStorage.setItem("picture", res.picture)
          localStorage.setItem("email", res.email)
          this.picture += localStorage.getItem("picture")
        }
      );
    }
    else {
      this.picture += localStorage.getItem("picture")
    } 

  }  
  checkScreenSize(){
    this.isSmallScreen = window.innerWidth <767;
  }
  toggleSidenav() {
    this.opened = !this.opened;
  
  }
  
  logout(): void{
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    localStorage.removeItem("picture");
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
