import signInFetch from "@/apis/users/useLoginAxios";
import { useMutation } from "@tanstack/react-query";

export default function useLoginQuery() {
  const signin = useMutation({
    mutationFn: signInFetch,
  });
  return { signin: signin };
}
