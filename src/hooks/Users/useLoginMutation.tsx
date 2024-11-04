import signInFetch from "@/apis/users/loginApi";
import { useMutation } from "@tanstack/react-query";

export default function useLoginMutation() {
  const signin = useMutation({
    mutationFn: signInFetch,
  });
  return { signin: signin };
}
