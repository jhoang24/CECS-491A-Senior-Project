import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getProductInfo(username: any): Observable<any>{
    return this.http.post("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/selling",{"username":username})
  }

  getHomeProducts(): Observable<any>{
    return this.http.get("https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/home")
  }
}
