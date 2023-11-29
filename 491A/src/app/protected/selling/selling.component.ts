import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  user: any;
  products: Array<any> = []
  loading: boolean = true;

  constructor(private router:Router, private productService: ProductService, private auth: AuthService, private matDialog: MatDialog) { 
    this.user = this.auth.getLoggedInUser();
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProductInfo(this.user.username)
    .subscribe(
      (res) => 
      {
        this.products=res.userSelling;
        this.loading = false;
      }
    );
  }



  openDeleteConfirm(uuid: any){
    this.matDialog.open(DeleteConfirmationDialogComponent,{
      width:'220px',
      data: {
        username: this.user.username,
        uuid: uuid
      }
    })

  }

}
