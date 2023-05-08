
/*
Interface for the Refresh Token
*/
export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Login Response
*/
export interface LoginResponse {
  accessToken: string;
  refreshToken: RefreshToken;
  tokenType: string;
}

/*
Interface for the Login Request
*/
export interface LoginRequest {
  email: string;
  password: string;
}

/*
Interface for the Register Request
*/
export interface RegisterRequest {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

/*
Interface for the Register Response
*/
export interface RegisterResponse {
  status: number;
  message: string;
}