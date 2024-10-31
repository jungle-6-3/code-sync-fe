import signInFetch from "@/apis/users/loginApi";
import { useMutation } from "@tanstack/react-query";

export default function useLoginQuery() {
  const signin = useMutation({
    mutationFn: signInFetch,
  });
  return { signin: signin };
}
