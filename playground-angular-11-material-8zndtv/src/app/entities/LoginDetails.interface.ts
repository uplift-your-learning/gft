export interface LoginDetails {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: boolean;
  token: string;
}
