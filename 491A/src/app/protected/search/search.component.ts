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

  ngOnInit(): void {
    // Whenever the query params for activated route changes, then so will the display for the search page
    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params['q'].toLowerCase();
      this.fetchSearchedProducts();
    });
  }

  fetchSearchedProducts() {
    this.productService.getSearchedProduct(this.query)
      .subscribe(
        (res) => {
          console.log(res.body);
          this.products = res.body.listings;
        }
      );
  }


}
