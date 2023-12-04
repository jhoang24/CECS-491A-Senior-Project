import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  products: Array<any> = []

  constructor(private router:Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  category: string = '';
  loading: boolean = true;
  sort = 'newest';


  ngOnInit(): void {
    // Whenever the query params for activated route changes, then so will the display for the category page
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params['q'];
      this.fetchCategoryProducts();
    });
  }

  fetchCategoryProducts() {
    this.loading = true;
    this.productService.getCategory(this.category)
      .subscribe(
        (res) => {
          console.log(res.body.listings);
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
