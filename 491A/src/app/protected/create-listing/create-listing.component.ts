import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { ProductService } from '../services/product.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


import { FormGroup, FormControl, Validators, UntypedFormControl } from '@angular/forms';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent {
  @ViewChild('imageInput') imageInput!: ElementRef;

  public files: File[] = [];
  email: any;
  mainCategories = [
    {
      name: 'Electronics',
      subCategories: [
        { name: 'Computers', value: 'computers' },
        { name: 'Phones', value: 'phones' },
        { name: 'Consoles', value: 'consoles' },
        { name: 'Chargers', value: 'chargers' },
        { name: 'Accessories', value: 'accessories' },
      ]
    },
    {
      name: 'Clothing & Accessories',
      subCategories: [
        { name: 'Jackets', value: 'jackets' },
        { name: 'Shirts', value: 'shirts' },
        { name: 'Pants', value: 'pants' },
        { name: 'Shoes', value: 'shoes' },
        { name: 'Socks', value: 'socks' },
      ]
    },
    {
      name: 'Books',
      subCategories: [
        { name: 'Textbooks', value: 'textbooks' },
        { name: 'Novels', value: 'novels' },
        { name: 'Fiction', value: 'fiction' },
        { name: 'Nonfiction', value: 'nonfiction' },
        { name: 'Manga', value: 'manga' },
      ]
    },
    {
      name: 'School Appliances',
      subCategories: [
        { name: 'Notebooks', value: 'notebooks' },
        { name: 'Pencils', value: 'pencils' },
        { name: 'Backpacks', value: 'backpacks' },
        { name: 'Erasers', value: 'erasers' },
      ]
    },
    {
      name: 'Furniture',
      subCategories: [
        { name: 'Tables', value: 'tables' },
        { name: 'Chairs', value: 'chairs' },
        { name: 'Lamps', value: 'lamps' },
        { name: 'Beds', value: 'beds' },
        { name: 'Drawers', value: 'drawers' },
      ]
    },
    {
      name: 'Sports & Outdoors',
      subCategories: [
        { name: 'Exercise', value: 'exercise' },
        { name: 'Yoga', value: 'yoga' },
        { name: 'Cycling', value: 'cycling' },
        { name: 'Skateboarding', value: 'skateboarding' },
        { name: 'Camping', value: 'camping' },
      ]
    },
  ];


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {
    // Gets the userName and sets it in dynamoDb
    this.createListingForm.get('userName')?.setValue(this.authService.getLoggedInUser());
    
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    console.log(this.email);
    


  }
  
  async resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Error resizing image'));
          }
        }, file.type);
      };

      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    });
  }

  async onFilesSelected(event: any) {
    const fileList: FileList | null = event.target.files;

    if (fileList) {
      const resizedImages: File[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const resizedBlob = await this.resizeImage(fileList[i], 500, 500); // Adjust the dimensions as needed
        const resizedFile = new File([resizedBlob], fileList[i].name, { type: fileList[i].type });
        resizedImages.push(resizedFile);
      }
      console.log("resized")

      this.files.push(...resizedImages);
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
    category: new FormControl(null, [Validators.required]),
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
    const base64Images: string[] = [];
  
    const resizeAndReadFile = async (file: File, index: number) => {
      const resizedBlob = await this.resizeImage(file, 500, 500); // Adjust dimensions as needed
      formData.append(`images${index + 1}`, new File([resizedBlob], file.name, { type: file.type }));
  
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const base64String = event.target.result;
          base64Images.push(base64String);
          resolve();
        };
        reader.readAsDataURL(resizedBlob);
      });
    };
  
    const filePromises = this.files.map(async (file, index) => {
      if (file instanceof File) {
        await resizeAndReadFile(file, index);
      }
    });
  
    Promise.all<void>(filePromises).then(() => {
      console.log(base64Images);
      this.productService.uploadImages(base64Images, uuid).pipe(
        tap(() => this.router.navigate(['/protected/listing/' + uuid]))
      ).subscribe(
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
