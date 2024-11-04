import { PostSaveMeetingRequest } from "@/apis/room/dtos";
import postSaveMeetingApi from "@/apis/saveMeetingApi";
import { useMutation } from "@tanstack/react-query";

export const useSaveMeetingMutation = (
  roomUuid: string,
  data: PostSaveMeetingRequest,
) => {
  return useMutation({
    mutationKey: ["savemeeting", roomUuid],
    mutationFn: () => postSaveMeetingApi(roomUuid, data),
  });
};
