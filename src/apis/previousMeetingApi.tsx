import { PreviousMeetingResponseDto } from "@/apis/conversation/dtos";
import https from "@/lib/https";

const previousMeetingApi = async (): Promise<PreviousMeetingResponseDto> => {
  const response =
    await https.get<PreviousMeetingResponseDto>("/conversations");
  return response.data;
};

export default previousMeetingApi;
