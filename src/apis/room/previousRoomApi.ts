import { GetPreviousRoomResponseDto, GetPreviousRoomsResponseDto } from "@/apis/conversation/dtos";
import { PatchConversationDatasRequest } from "@/apis/room/dtos";
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

export const patchPreviousRoom = async (
  dataPk: string, body: PatchConversationDatasRequest
) => {
  const { data } = await https.patch(`/conversation-datas/${dataPk}`, body);
  return data;
}