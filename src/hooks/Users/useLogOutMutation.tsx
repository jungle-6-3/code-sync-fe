import postLogoutHttps from "@/apis/users/logoutApi";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: postLogoutHttps,
  });
};
