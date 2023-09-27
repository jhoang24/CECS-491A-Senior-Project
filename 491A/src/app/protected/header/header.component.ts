import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public profileData: Object = "";

  constructor(private http: HttpClient, private authservice: AuthService, private router:Router) { 

  }

  ngOnInit(): void {
    this.getProfileInfo();
    console.log(this.profileData)

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

    // this.http.get("https://dummyjson.com/products/1")

    // .subscribe({
    //   next: (res) => {return res}
    // })

    // const url = 'https://dummyjson.com/products/1';
    // return this.http.post<any>(url, {"username":"cone"}).pipe(
    // tap((res: any) => {
    //   console.log(res.json())

    // }))
    
}
