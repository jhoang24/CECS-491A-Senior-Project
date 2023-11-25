import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, Validators, UntypedFormControl } from '@angular/forms';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent {
  // Array to hold the files you input
  public files: File[] = [];
  email: any;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private productService: ProductService
  ) {
    // Gets the userName and sets it in dynamoDb
    this.createListingForm.get('userName')?.setValue(this.authService.getLoggedInUser());
    
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    console.log(this.email);

  }

  onFilesSelected(event: any) {
    this.files = event.target.files;
  }

  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[<any>key]);
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }

  deleteFile(f: File){
    this.files = this.files.filter(function(w){ return w.name != File.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  deleteFromArray(index: any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }

  openConfirmDialog(pIndex: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  createListingForm = new FormGroup({
    uuid: new FormControl('', [Validators.required]),
    itemName: new FormControl(null, [Validators.required]),
    itemDescription: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    catagory: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    images: new FormControl(null),
    userName: new FormControl(null),
    email: new FormControl(null),

  });

  // upload() {
  //   const formData = new FormData();
  //   for (let i = 0; i < this.files.length; i++) {
  //     formData.append('images', this.files[i]);
  //   }

  //   this.productService.uploadImages(formData).subscribe(
  //     (response) => {
  //       // Handle response from the server (if needed)
  //       console.log('Images uploaded:', response);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error uploading images:', error);
  //     }
  //   );
  // }

  createListing() {
    if (!this.createListingForm.valid) {
      return;
    }

    // const formData = new FormData();
    // for (let i = 0; i < this.files.length; i++) {
    //   formData.append('images', this.files[i]);
    // }
    this.createListingForm.get('email')?.setValue(this.email);

    this.productService.createListing(this.createListingForm.value).subscribe(
      (res) => {
      }
    );
    // this.upload();
  }

  
}
