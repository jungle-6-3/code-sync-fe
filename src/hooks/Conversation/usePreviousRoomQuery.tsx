import previousRoomApi from "@/apis/previousRoomApi";
import { useQuery } from "@tanstack/react-query";

export default function usePreviousRoomQuery(currentPage: number) {
  const { data: previousRoom } = useQuery({
    queryKey: ["previousRoom", currentPage],
    queryFn: () => previousRoomApi(currentPage),
  });
  return { previousRoom };
}
