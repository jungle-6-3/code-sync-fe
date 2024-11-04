import {
  PostSaveMeetingRequest,
  PostSaveMeetingResponse,
} from "@/apis/room/dtos";
import https from "@/lib/https";

const postSaveMeetingApi = async (roomUuid: string, data: PostSaveMeetingRequest) => {
  const response = await https.post<PostSaveMeetingResponse>(
    `/room/save/${roomUuid}`,
    data,
  );
  return response.data;
};

export default postSaveMeetingApi;
