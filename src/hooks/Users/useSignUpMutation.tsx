import postSignUp from "@/apis/users/signUpApi";
import { useMutation } from "@tanstack/react-query";

export default function usePostData() {
  const signup = useMutation({
    mutationFn: postSignUp,
  });

  return {
    signup: signup,
  };
}
