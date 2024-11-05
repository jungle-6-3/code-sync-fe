import getPreviousRoomApi from "@/apis/previousRoomApi";
import { useQuery } from "@tanstack/react-query";

export default function usePreviousRoomQuery(currentPage: number) {
  const { data: previousRoom, isError, isLoading, } = useQuery({
    queryKey: ["previousRoom", currentPage],
    queryFn: () => getPreviousRoomApi(currentPage),
  });
  return { previousRoom, isError, isLoading };
}
