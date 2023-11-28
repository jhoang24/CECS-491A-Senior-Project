import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateListingRequest, CreateListingResponse} from 'src/app/public/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private auth: AuthService) { }

  getProductInfo(username: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/selling",{"username":username})
  }

  getHomeProducts(): Observable<any>{
    return this.http.get("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/home")
  }

  deleteProduct(username: any, listingID: any){
    const url = `https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/selling?username=${username}&listingID=${listingID}`;
    return this.http.delete(url);
  }
  
  uploadImages(images: any[], uuid: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/upload-images",{"images":images, "uuid": uuid})
  }

  createListing(createListingRequest: CreateListingRequest): Observable<CreateListingResponse>{
    const url = "https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/createlisting";

    // You should send the actual request data (createListingRequest) instead of the interface itself (CreateListingResponse).
    return this.http.post<CreateListingResponse>(url, createListingRequest).pipe(
      tap((res: CreateListingResponse) => {
        // Assuming this.snackbar is defined in your service/component
        this.snackbar.open(`User created listing successfully`, 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }),
    );
  }
}
