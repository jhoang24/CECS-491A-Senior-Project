import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private currentListingUsernameSubject = new BehaviorSubject<string>('');
  private currentListingUuidSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { 
    const storedListingUsername = sessionStorage.getItem('currentListingUsername');
    const storedListingUuid = sessionStorage.getItem('currentListingUuid');

    if (storedListingUsername) {
      this.currentListingUsernameSubject.next(storedListingUsername);
    }

    if (storedListingUuid) {
      this.currentListingUuidSubject.next(storedListingUuid);
    }
  }

  setCurrentListingUsername(username: string): void {
    sessionStorage.setItem('currentListingUsername', username);
    this.currentListingUsernameSubject.next(username);
  }

  getCurrentListingUsername(): Observable<string> {
    return this.currentListingUsernameSubject.asObservable();
  }

  setCurrentListingUuid(uuid: string): void {
    sessionStorage.setItem('currentListingUuid', uuid);
    this.currentListingUuidSubject.next(uuid);
  }

  getCurrentListingUuid(): Observable<string> {
    return this.currentListingUuidSubject.asObservable();
  }

  getListingInfo( UUID: any): Observable<any> {
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/listing", {"uuid":UUID })
  }

  navigateToListing(uuid: string): void {
    this.router.navigate(['/listing', uuid]);
  }


}