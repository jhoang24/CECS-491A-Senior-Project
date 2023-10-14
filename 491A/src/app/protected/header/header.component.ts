import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
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
