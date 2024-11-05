import postSaveMeetingApi from "@/apis/saveMeetingApi";
import { useMutation } from "@tanstack/react-query";

export const useSaveMeetingMutation = () => {
  return useMutation({
    mutationKey: ["savemeeting"],
    mutationFn: postSaveMeetingApi,
  });
};
