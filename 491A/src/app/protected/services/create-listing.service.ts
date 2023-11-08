import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProfileResponse } from 'src/app/public/interfaces';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { CreateListingRequest, CreateListingResponse} from 'src/app/public/interfaces';
@Injectable({
  providedIn: 'root'
})


export class createListingService {  
  // username: any;

  // this.username grabs decodedtoken from authservice
  constructor(private http: HttpClient, private auth: AuthService) { 
  }

  uploadImages(formData: FormData) {
    return this.http.post<any>('YOUR_API_ENDPOINT/upload-images', formData);
  }
  
}
