export interface PostLoginRequestUserDto {
  email: string;
  password: string;
}

export interface PostLoginResponseUserDto {
  success: boolean;
  message: string;
}

export interface PostSignUpRequestUserDto {
  name: string;
  email: string;
  password: string;
}

export interface PostSignUpResponseUserDto {
  success: boolean;
  message: string;
}

interface UserData {
  email: string;
  name: string;
}

export interface GetCheckUserLoginResponseDto {
  success: boolean;
  message: string;
  data: UserData;
}

export interface PostLogoutResponseDto {
  success: boolean;
  message: string;
}
