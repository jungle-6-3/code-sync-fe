import { GetCheckUserLoginResponseDto } from "@/apis/users/dtos";
import https from "@/lib/https";

export const getCheckUserLogin =
  async (): Promise<GetCheckUserLoginResponseDto> => {
    const response = await https.get<GetCheckUserLoginResponseDto>("/users/me");
    return response.data;
  };
