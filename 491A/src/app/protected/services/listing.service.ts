import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  getListingInfo( UUID: any): Observable<any> {
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/listing", {"uuid":UUID })
  }

  navigateToListing(uuid: string): void {
    this.router.navigate(['/listing', uuid]);
  }


}