import signInFetch from "@/hooks/Login/useLoginAxios";
import { useMutation } from "@tanstack/react-query";

export default function useLoginQuery() {
    const signin = useMutation({
        mutationFn: signInFetch,
    })
    return {signin: signin}
}

