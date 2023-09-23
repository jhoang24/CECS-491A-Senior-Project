import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { 

  }

  ngOnInit(): void {
    this.getProfileInfo();
    console.log(this.profileData)
  }

  private profileData: any = []

 
  getProfileInfo(){
    this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile",{"username":"cone"})
    .subscribe((res)=>{
       this.profileData = res;
  
    })
    
  }

}
