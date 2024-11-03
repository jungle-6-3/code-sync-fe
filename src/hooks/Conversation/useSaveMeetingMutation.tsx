import { PostSaveMeetingRequest } from "@/apis/room/dtos";
import saveMeetingApi from "@/apis/saveMeetingApi"
import { useMutation } from "@tanstack/react-query";

export const useSaveMeetingMutation = (roomUuid: string, data: PostSaveMeetingRequest) => {
    return useMutation({
        mutationKey: ["savemeeting", roomUuid],
        mutationFn: () => saveMeetingApi(roomUuid, data),
    });
};