import { GetCheckUserLoginResponseDto } from "@/apis/users/dtos";
import https from "@/lib/https";

export const getCheckUserLogin = async () => {
  const { data } = await https.get<GetCheckUserLoginResponseDto>("/users/me");
  return data;
};
