
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

export interface LoginResponse {
  username: string;
  token: string;
}

/*
Interface for the Login Request (can look different, based on your backend api)
*/
export interface LoginRequest {
  username: string;
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


//interface for create-listing 
export interface CreateListingRequest{
  listing: string;
  itemName: string;
  itemDescription: string;
  condition: string;
  catagory: string;
  price: string;
  images: null;
  userName: string;
}

export interface CreateListingResponse{
  status: number;
  message: string;
}

export interface GetProfileResponse{
  user: Object;
  picture: string;
}