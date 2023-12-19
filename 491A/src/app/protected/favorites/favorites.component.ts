// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ListingService } from '../services/listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  //Commented for html and css purposes only

  // favorites: { text: string; imageUrl: string }[] = [];

  // constructor(private favoritesService: FavoritesService) {}

  // ngOnInit(): void {
  //   // Initialize dummy favorites for testing
  //   this.favoritesService.initializeDummyFavorites();

  //   // Fetch favorites after initialization
  //   this.favorites = this.favoritesService.getFavorites();
  // }

  // removeFromFavorites(post: { text: string; imageUrl: string }): void {
  //   this.favoritesService.removeFromFavorites(post);
  //   this.favorites = this.favoritesService.getFavorites();
  // }

  products: Array<any> = []
  loading: boolean = true;
  UUID: string='';
  sort = 'newest';

  constructor(private router:Router, private productService: ProductService, private listingService: ListingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true; 

    this.productService.getHomeProducts()
    .subscribe(
      (res) => 
      {
        this.products=res.body.listings;
        console.log(res.body)
        this.loading = false;
      }
    );

    this.route.params.subscribe(params => {
      this.UUID = params.uuid;

      if(this.UUID){
        this.listingService.getListingInfo(this.UUID).subscribe(
          (res) => {

          }
        )
      }
    })
    
  }
}
