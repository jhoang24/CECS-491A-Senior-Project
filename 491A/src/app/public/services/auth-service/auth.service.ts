import { LOCALSTORAGE_TOKEN_KEY } from './../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, CreateListingRequest, CreateListingResponse} from '../../interfaces';

// export const LogIn: LoginResponse = {
//   // fakeAccessToken.....should all come from real backend
//   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
//   refreshToken: {
//     id: 1,
//     userId: 2,
//     token: 'fakeRefreshToken...should al come from real backend',
//     refreshCount: 2,
//     expiryDate: new Date(),
//   },
//   tokenType: 'JWT'
// }



export const Register: RegisterResponse = {
  status: 200,
  message: 'Registration sucessfull.'
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private jwtService: JwtHelperService
  ) { 
    //this._isLoggedIn$.next(!!LOCALSTORAGE_TOKEN_KEY);
  }

 
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // return of(fakeLoginResponse).pipe(
    //   tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
    //   tap(() => this.snackbar.open('Login Successfull', 'Close', {
    //     duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    //   }))
    // );
    

    
    const url = `https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/login`;
    return this.http.post<any>(url, loginRequest).pipe(
    tap((res: LoginResponse) => {
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.token)
      this._isLoggedIn$.next(true);
    }),
    tap(() => this.snackbar.open('Login Successfull', 'Close', {
    duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'}
    )));
    
  }

  /*
   The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
  */
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    // TODO
    const url = `https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/register`;
    return this.http.post<any>(url, registerRequest).pipe(
      tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
    );
    // return this.http.post<RegisterResponse>('/api/auth/register', registerRequest).pipe(
    // tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
    //  duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    // }))
    // )
  }

  updatePassword(password: string): Observable<any>{
    return this.http.post('',{password});

  }

  /*
   Get the user fromt the token payload
   */
  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken;
  }

  /*
  createListing(createListingRequest: CreateListingRequest): Observable<CreateListingResponse>{
    const url = "https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/createlisting"
    return this.http.post<any>(url, CreateListingResponse).pipe(
      tap((res: CreateListingResponse) => this.snackbar.open(`User created listing successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
    ); 
  }
}
*/
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

