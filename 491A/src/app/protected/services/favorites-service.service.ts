// favorites.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class FavoritesServiceService{
  constructor(private http: HttpClient, private auth: AuthService) { }

  private favorites: { text: string; imageUrl: string }[] = [];

  initializeDummyFavorites(): void {
    this.favorites = [
      { text: 'Dummy Post 1', imageUrl: 'url1.jpg' },
      { text: 'Dummy Post 2', imageUrl: 'url2.jpg' },
      { text: 'Dummy Post 3', imageUrl: 'url3.jpg' },
    ];
  }

  getFavorites(): { text: string; imageUrl: string }[] {
    return this.favorites;
  }

  /*
  addToFavorites(post: { text: string; imageUrl: string }): void {
    this.favorites.push(post);
  }

  removeFromFavorites(post: { text: string; imageUrl: string }): void {
    const index = this.favorites.indexOf(post);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }
  */

  addToFavorites(username:any ,uuid: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/addFavorite",{"username":username, "uuid": uuid})
  }

  removeFromFavorites(username:any): Observable<any>{
    return this.http.get("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/home")
  }
}
