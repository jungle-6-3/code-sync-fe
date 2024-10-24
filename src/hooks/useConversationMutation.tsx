import { postCreateRoom } from "@/apis/room";
import { useMutation } from "@tanstack/react-query";

export const useConversationMutation = () => {
  return useMutation({
    mutationKey: ["conversations"],
    mutationFn: postCreateRoom,
  });
};
