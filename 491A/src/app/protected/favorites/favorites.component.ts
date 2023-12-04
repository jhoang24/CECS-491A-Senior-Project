// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoritesServiceService } from '../services/favorites-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: { text: string; imageUrl: string }[] = [];

  constructor(private favoritesService: FavoritesServiceService) {}

  ngOnInit(): void {
    // Initialize dummy favorites for testing
    this.favoritesService.initializeDummyFavorites();

    // Fetch favorites after initialization
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFromFavorites(post: { text: string; imageUrl: string }): void {
    this.favoritesService.removeFromFavorites(post);
    this.favorites = this.favoritesService.getFavorites();
  }
}
