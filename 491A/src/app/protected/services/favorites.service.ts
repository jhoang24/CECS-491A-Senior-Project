// favorites.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class FavoritesService{
  constructor(private http: HttpClient, private auth: AuthService) { }

  addToFavorites(username:any ,uuid: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/add-favorite",{"username":username, "uuid": uuid})
  }

  removeFromFavorites(username:any, uuid: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/delete-favorite", {"username":username, "uuid": uuid})
  }
}