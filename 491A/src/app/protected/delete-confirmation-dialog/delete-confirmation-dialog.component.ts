import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }

  confirm() {
    this.productService.deleteProduct(this.data.username, this.data.uuid).subscribe(res=>{
      console.log(res);
      window.location.reload();

    });
    this.dialogRef.close();
  }



}
