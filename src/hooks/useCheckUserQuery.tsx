import checkUserLogin from "@/apis/checkUserValidApi";
import { useQuery } from "@tanstack/react-query";

export default function useCheckUserQuery() {
  const { data: checkUser } = useQuery({
    queryKey: ["userCheck"],
    queryFn: checkUserLogin,
  });
  return { checkUser };
}
