import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { profile } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profileData: any = {
    user: "",
    picture: ""
  }
  
  constructor(private http: HttpClient, private authservice: AuthService, private router:Router) { 
  }

  ngOnInit(): void {
    this.getProfileInfo();

  }

  // Since profileData's fields are initialized as empty, this get function will update this.profileData.picture after the http post request
  get profilePicture(): string{
    return "data:image/png;base64," + this.profileData.picture;
  }

  getProfileInfo(): void{
    this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile",{"username":"cone"})

    .subscribe({
      next: (res) => {
        this.profileData=res;
      
      }
    })
  }

  logout(): void{
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    this.router.navigate(['../../']);
  }
    
}
