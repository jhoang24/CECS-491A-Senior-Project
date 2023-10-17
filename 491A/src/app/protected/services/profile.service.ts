import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {  
  username: any;

  // this.username grabs decodedtoken from authservice
  constructor(private http: HttpClient, private auth: AuthService) { 
    this.username = this.auth.getLoggedInUser();
 
  }

  getProfileInfo(): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile",{"username":this.username.username})
  }
  
}
