import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ProductService } from '../services/product.service';
import { ListingService } from '../services/listing.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  onSortUpdated(sortValue: string): void {
    switch (sortValue) {
      case 'price lowest':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price highest':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        this.products.sort((a, b) => a.uuid - b.uuid);
        break;
      case 'newest':
        this.products.sort((a, b) => b.uuid - a.uuid);
        break;
    }
    this.sort = sortValue

  }


 navigateToListing(uuid: string): void{
  this.listingService.navigateToListing(uuid);
 }
}
