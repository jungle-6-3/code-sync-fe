import { GetPreviousRoomResponseDto, GetPreviousRoomsResponseDto } from "@/apis/conversation/dtos";
import https from "@/lib/https";

export const getPreviousRoomsApi = async (
  currentPage: number,
): Promise<GetPreviousRoomsResponseDto> => {
  const { data } = await https.get("/conversations", {
    params: { page: currentPage },
  });
  return new GetPreviousRoomsResponseDto(data);
};

export const getPreviousRoom = async (
  conversationId: string,
) => {
  const { data } = await https.get<GetPreviousRoomResponseDto>(`/conversations/${conversationId}`);
  return data;
}