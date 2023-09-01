import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent{

  constructor(private http: HttpClient) { }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }


  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const imageFile = files[0];

      if (imageFile.type === 'image/jpeg') {
        await this.uploadImage(imageFile);
      } else {
        console.error('Invalid file format. Please drop a .jpg image.');
      }
    }
  }

  async uploadImage(imageFile: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await this.http.post<any>('https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev', formData).toPromise();
      console.log('Image uploaded:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  


  registerForm = new FormGroup({
    image: new FormControl(null, [Validators.required]),
    itemName: new FormControl(null, [Validators.required]),
    itemDescription: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    catagory: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required])
  })

  

  ngOnInit(): void {
  }

}

