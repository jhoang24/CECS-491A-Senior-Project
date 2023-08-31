import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent implements OnInit {
  
  registerForm = new FormGroup({
    itemName: new FormControl(null, [Validators.required]),
    itemDescription: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    catagory: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required])

  })

  constructor() { }

  ngOnInit(): void {
  }

}
