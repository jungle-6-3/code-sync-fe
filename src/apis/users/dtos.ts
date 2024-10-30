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

interface UserData {
  email: string;
  name: string;
}

export interface CheckUserLoginResponseDto {
  success: boolean;
  message: string;
  data: UserData;
}

export interface LogOutResponseDto {
  success: boolean;
  message: string;
}
