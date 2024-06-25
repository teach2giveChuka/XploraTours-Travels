export interface Responses {
    totalAmount: number;
  }

  export interface SignUpResponse {
    message: string;
    responseCode: number;
  }

export interface LoginResponse {
  responseCode: number;
  message: string;
  role: string;
}