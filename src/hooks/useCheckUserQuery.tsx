import { useSuspenseQuery } from "@tanstack/react-query";
import checkUserLogin from "@/apis/checkUserValidApi";

export default function useCheckUserQuery() {
  const { data: checkUser } = useSuspenseQuery({
    queryKey: ["userCheck"],
    queryFn: checkUserLogin,
  });
  return { checkUser };
}
