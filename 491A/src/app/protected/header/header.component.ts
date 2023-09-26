import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { 

  }


  ngOnInit(): void {
    this.profileData = this.getProfileInfo();
    console.log(this.profileData);
  }

  private profileData: any;

 
  getProfileInfo(){
    this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile",{"username":"cone"})

    .subscribe({
      next: (res) => {return res;}
    })

    // const url = `https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/get-profile`;
    // return this.http.post<any>(url, {"username":"cone"}).pipe(
    // tap((res: any) => {
    //   console.log(res)

    // }))
    
  }

}
