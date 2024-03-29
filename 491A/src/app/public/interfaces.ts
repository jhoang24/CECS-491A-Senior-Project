
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
export interface CreateListingRequest {
  uuid?: string | null;
  itemName?: string | null;
  itemDescription?: string | null;
  condition?: string | null;
  catagory?: string | null;
  price?: string | null;
  images?: null;
  userName?: string | null;
  imagesLength?: number | null;

}


export interface CreateListingResponse{
  status: number;
  message: string;
}

export interface GetProfileResponse{
  user: Object;
  picture: string;
}