export interface LoginRequestUserDto {
  email: string;
  password: string;
}

export interface LoginResponseUserDto {
  success: boolean;
  message: string;
}

export interface SignUpRequestUserDto {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponseUserDto {
  success: boolean;
  message: string;
}
