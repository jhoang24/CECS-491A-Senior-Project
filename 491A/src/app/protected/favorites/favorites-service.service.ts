// favorites.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesServiceService{
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

  addToFavorites(post: { text: string; imageUrl: string }): void {
    this.favorites.push(post);
  }

  removeFromFavorites(post: { text: string; imageUrl: string }): void {
    const index = this.favorites.indexOf(post);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }
}
