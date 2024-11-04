import { GetPreviousRoomResponseDto } from "@/apis/conversation/dtos";
import https from "@/lib/https";

const getPreviousRoomApi = async (
  currentPage: number,
): Promise<GetPreviousRoomResponseDto> => {
  const response = await https.get<GetPreviousRoomResponseDto>(
    "/conversations",
    {
      params: { page: currentPage },
    },
  );
  return response.data;
};

export default getPreviousRoomApi;
