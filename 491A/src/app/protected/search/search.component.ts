import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products: Array<any> = []

  constructor(private router:Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  query: string = '';
  loading: boolean = true;
  sort = 'newest';


  ngOnInit(): void {
    // Whenever the query params for activated route changes, then so will the display for the search page
    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params['q'].toLowerCase();
      this.fetchSearchedProducts();
    });
  }

  fetchSearchedProducts() {
    this.loading = true;
    this.productService.getSearchedProduct(this.query)
      .subscribe(
        (res) => {
          console.log(res.body);
          this.products = res.body.listings;
          this.loading = false;
        }
      );
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


}
