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
    const fileList: FileList | null = event.target.files;
  
    if (fileList) {
      this.files.push(...Array.from(fileList));
    }
  }
  
  onFileChange(event: any) {
    const fileList: FileList | null = event?.target?.files;
  
    if (fileList) {
      this.files.push(...Array.from(fileList));
    }
  }

  deleteFile(f: File){
    this.files = this.files.filter(function(w){ return w.name != f.name });
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
    uuid: new FormControl(''),
    itemName: new FormControl(null, [Validators.required]),
    itemDescription: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    catagory: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    images: new FormControl(null),
    userName: new FormControl(null),
    email: new FormControl(null),
    imagesLength: new FormControl(0),


  });

  upload(uuid: any) {
    const formData = new FormData();
    var base64Images: string[] = [];
  
    const readFile = (file: File, index: number) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const base64String = event.target.result;
          base64Images.push(base64String);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    };
  
    const filePromises = this.files.map(async (file, index) => {
      if (file instanceof File) {
        formData.append(`images${index + 1}`, file);
        await readFile(file, index);
      }
    });
  
    Promise.all<void>(filePromises).then(() => {
      console.log(base64Images);
      this.productService.uploadImages(base64Images, uuid).subscribe(
        (res) => {
          console.log(res);
        }
      );
    });
  }
  
  createListing() {
    if (!this.createListingForm.valid) {
      return;
    }
    var uuid = Math.round(window.performance.timing.navigationStart + window.performance.now());
    console.log(uuid);

    this.createListingForm.get('email')?.setValue(this.email);
    this.createListingForm.get('uuid')?.setValue(String(uuid));
    this.createListingForm.get('imagesLength')?.setValue(this.files.length);

  
    // console.log(this.files)
    // console.log(this.createListingForm.value);

    this.productService.createListing(this.createListingForm.value).subscribe(
      (res) => {
      }
    );
    this.upload(uuid);
  }

  
}
