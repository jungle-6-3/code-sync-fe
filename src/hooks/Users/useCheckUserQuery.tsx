import { useQuery } from "@tanstack/react-query";
import checkUserLogin from "@/apis/users/checkUserValidApi";

export default function useCheckUserQuery() {
  const { data: checkUser } = useQuery({
    queryKey: ["userCheck"],
    queryFn: checkUserLogin,
  });
  return { checkUser };
}
