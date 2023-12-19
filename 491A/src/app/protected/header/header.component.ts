import { Component, OnChanges, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private router:Router, private profileService: ProfileService, private auth: AuthService,  private route: ActivatedRoute) { 
    this.user = this.auth.getLoggedInUser();
    console.log(this.user);
        
    this.email = localStorage.getItem('email');
    this.currentAddress = this.findAddress(this.email);
    console.log(this.currentAddress)
  }


  enteredButton = false;
  isMatMenuOpen = false;
  user: any;
  isSmallScreen = false;
  opened = false;

  searchValue: string = '';
  email: any;
  currentAddress: any;

  onSubmit(): void{
    this.router.navigate(['/protected/search'], {queryParams: {q: this.searchValue}})
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


  findAddress(email: string){
    const currentEmail = this.extractDomainSuffix(email);
    const currentAddress = this.getFullAddressForCSU(currentEmail);
    return currentAddress
  }

  getFullAddressForCSU(csuCode: any) {
    const csuAddresses: { [key: string]: string } = {
      'CSUB': 'California State University, Bakersfield',
      'CSUC': 'California State University, Chico',
      'CSUDH': 'California State University, Dominguez Hills',
      'CSUF': 'California State University, Fullerton',
      'CSUG': 'California State University, Fresno',
      'CSULB': 'California State University, Long Beach',
      'CSULA': 'California State University, Los Angeles',
      'CSUM': 'California Maritime Academy',
      'CSUN': 'California State University, Northridge',
      'CSUPO': 'California State Polytechnic University, Pomona',
      'CSUS': 'California State University, Sacramento',
      'CSUSB': 'California State University, San Bernardino',
      'CSUSM': 'California State University, San Marcos',
      'CSUSC': 'California State University, Stanislaus',
      // Add more CSU addresses as needed
    };
  
    return csuAddresses[csuCode.toUpperCase()] || 'Address not found.';
  }
  extractDomainSuffix = (email: string): string | null => {
    const domainRegex = /@.*\.(\w+)\.edu$/;
    const match = email.match(domainRegex);
  
    if (match && match.length > 1) {
      return match[1];
    }
  
    return null;
  };


    
}
