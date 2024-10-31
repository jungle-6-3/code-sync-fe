import { CheckUserLoginResponseDto } from "@/apis/users/dtos";
import https from "@/lib/https";

const checkUserLogin = async (): Promise<CheckUserLoginResponseDto> => {
  const response = await https.get<CheckUserLoginResponseDto>("users/me");
  return response.data;
};

export default checkUserLogin;
