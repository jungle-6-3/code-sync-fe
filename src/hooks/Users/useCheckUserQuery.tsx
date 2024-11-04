import { getCheckUserLogin } from "@/apis/users/checkUserValidApi";
import { useQuery } from "@tanstack/react-query";

export default function useCheckUserQuery() {
  const {
    data: checkUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userCheck"],
    queryFn: getCheckUserLogin,
    retry: 0,
    gcTime: 0,
    staleTime: 0,
  });
  return { checkUser, isError, isLoading };
}
