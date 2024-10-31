import logOutHttps from "@/apis/logOutApi";
import { useMutation } from "@tanstack/react-query";

export const useLogOutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logOutHttps,
  });
};
