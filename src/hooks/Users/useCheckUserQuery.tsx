import { useQuery } from "@tanstack/react-query";
import checkUserLogin from "@/apis/users/checkUserValidApi";

export default function useCheckUserQuery() {
  const {
    data: checkUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userCheck"],
    queryFn: checkUserLogin,
    retry: 0,
  });
  return { checkUser, isError, isLoading };
}
