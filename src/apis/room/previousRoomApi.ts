import { GetPreviousRoomResponseDto, GetPreviousRoomsResponseDto, getPreviousShareRoomResponseDto } from "@/apis/conversation/dtos";
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
  const { data } = await https.patch(`/conversations/${dataPk}`, body);
  return data;
}

export const getSharedPreviouseRoom = async (shardId: string) => {
  const { data } = await https.get(`/conversations/share/${shardId}`);
  return data;
}

export const getPreviousShareRoom = async (
  shareId: string,
) => {
  const {data} = await https.get<getPreviousShareRoomResponseDto>(`/conversations/share/${shareId}`);
  return data;
}