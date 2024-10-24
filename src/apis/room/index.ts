import { PostCreateRoomRequest, PostCreateRoomResponse, PostSaveRoomRequest, PostSaveRoomResponse } from "@/apis/room/dtos";
import https from "@/lib/https";


export const postCreateRoom = async ({ githubPrUrl }: PostCreateRoomRequest) => {
  const response = await https.post<PostCreateRoomResponse>(`/room${githubPrUrl}`);
  return response.data;
}

export const postSaveRoom = async ({ roomId, data }: PostSaveRoomRequest) => {
  const response = await https.post<PostSaveRoomResponse>(`/room/${roomId}`, data);
  return response.data;
}