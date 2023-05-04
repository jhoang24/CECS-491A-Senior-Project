/*
Interface for the Refresh Token (can look different, based on your backend api)
*/
export interface RefreshToken {
    id: number;
    userId: number;
    token: string;
    refreshCount: number;
    expiryDate: Date;
  }
  
  /*
  Interface for the Login Response (can look different, based on your backend api)
  */
  export interface LoginResponse {
    accessToken: string;
    refreshToken: RefreshToken;
    tokenType: string;
  }
  
  /*
  Interface for the Login Request (can look different, based on your backend api)
  */
  export interface LoginRequest {
    email: string;
    password: string;
  }