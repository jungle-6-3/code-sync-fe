import { PostSaveMeetingResponse } from "@/apis/room/dtos";
import https from "@/lib/https";

const postSaveMeetingApi = async (roomUuid: string) => {
  const response = await https.post<PostSaveMeetingResponse>(
    `/room/save/${roomUuid}`,
  );
  return response.data;
};

export default postSaveMeetingApi;
