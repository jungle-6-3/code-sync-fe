import signUpFetch from "@/hooks/SignUp/useSignUpAxios";
import { useMutation } from "@tanstack/react-query";


export default function usePostData() {
  const signup = useMutation({
    mutationFn: signUpFetch,
  });

  return {
    signup: signup,
  };
}
