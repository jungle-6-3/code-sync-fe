import postSignUp from "@/apis/users/signUpApi";
import { useMutation } from "@tanstack/react-query";

const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: postSignUp,
  });
};

export default useSignUpMutation;