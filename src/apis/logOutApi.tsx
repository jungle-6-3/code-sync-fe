import { LogOutResponseDto } from "@/apis/users/dtos";
import https from "@/lib/https";

const logOutHttps = async (): Promise<LogOutResponseDto> => {
  const response = await https.post<LogOutResponseDto>("/auth/logout");
  return response.data;
};

export default logOutHttps;
