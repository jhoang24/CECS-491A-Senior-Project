import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<any> = []
  loading: boolean = true;

  constructor(private router:Router, private productService: ProductService) { }

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
  }


  
}
