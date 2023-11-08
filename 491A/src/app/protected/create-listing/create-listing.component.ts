import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../public/custom-validator';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { createListingService } from '../services/create-listing.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent{


  // for a file it is uuid/ 
  //array to hold the files you input
  public files: any[] = [];
  


  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private authService: AuthService, private http: HttpClient, private createListingService: createListingService){}

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

  openConfirmDialog(pIndex:any): void {
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
    uuid: new FormControl(null, [Validators.required]),
    itemName: new FormControl(null, [Validators.required]),
    itemDescription: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    catagory: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    images: new FormControl(null),
    userName: new FormControl(null)
  })

  /*
  onSubmit() {
    if (this.files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append('images', this.files[i]);
      }

      this.http.post('YOUR_BACKEND_API_URL/uploadMultiple', formData).subscribe((response) => {
        console.log('Images uploaded:', response);
        // Handle response or any additional actions after successful upload
      });
    }
  }
  */

  upload() {
    const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append('images', this.files[i]);
      }

    this.createListingService.uploadImages(formData).subscribe(
      (response) => {
        // Handle response from the server (if needed)
        console.log('Images uploaded:', response);
      },
      (error) => {
        // Handle error
        console.error('Error uploading images:', error);
      }
    );
  }


  createListing(){
    if(!this.createListingForm.valid){
      return;
    }
    this.authService.createListing(this.createListingForm.value).subscribe();
    this.upload();
  }

  ngOnInit(): void {
  }

}

