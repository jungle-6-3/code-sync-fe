import { GetPreviousRoomResponseDto } from "@/apis/conversation/dtos";
import https from "@/lib/https";

const getPreviousRoomApi = async (
  currentPage: number,
): Promise<GetPreviousRoomResponseDto> => {
  const { data } = await https.get("/conversations", {
    params: { page: currentPage },
  });
  return new GetPreviousRoomResponseDto(data);
};

export default getPreviousRoomApi;
