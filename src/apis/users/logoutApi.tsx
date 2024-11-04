import { PostLogoutResponseDto } from "@/apis/users/dtos";
import https from "@/lib/https";

const postLogoutHttps = async (): Promise<PostLogoutResponseDto> => {
  const response = await https.post<PostLogoutResponseDto>("/auth/logout");
  return response.data;
};

export default postLogoutHttps;
