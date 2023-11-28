import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getListingInfo( UUID: any): Observable<any> {
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/listing", {"UUID":UUID })
  }
}