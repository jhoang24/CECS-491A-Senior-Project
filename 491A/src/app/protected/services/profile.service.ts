import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileData: any = {
    user: "",
    picture: ""
  }
  

  constructor(private http: HttpClient) { }

  // Since profileData's fields are initialized as empty, this get function will update this.profileData.picture after the http post request
  get profilePicture(): string {
    return this.profileData.picture;
   
  }

  getProfileInfo(): void{
    this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile",{"username":"cone"})

    .subscribe({
      next: (res) => {
        this.profileData=res;
      
      }
    })
  }
  
}
