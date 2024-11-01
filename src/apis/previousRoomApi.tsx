import { PreviousRoomResponseDto } from "@/apis/conversation/dtos";
import https from "@/lib/https";

const previousRoomApi = async (
  currentPage: number,
): Promise<PreviousRoomResponseDto> => {
  const response = await https.get<PreviousRoomResponseDto>("/conversations", {
    params: { page: currentPage },
  });
  return response.data;
};

export default previousRoomApi;
