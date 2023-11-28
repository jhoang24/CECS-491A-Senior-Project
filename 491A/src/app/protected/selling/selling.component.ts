import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  user: any;
  products: Array<any> = []

  constructor(private router:Router, private productService: ProductService, private auth: AuthService) { 
    this.user = this.auth.getLoggedInUser();
  }

  picture: string = "data:image/png;base64,"

  ngOnInit(): void {
    this.productService.getProductInfo(this.user.username)
    .subscribe(
      (res) => 
      {
        this.products=res.userSelling;
      }
    );
  }

}
