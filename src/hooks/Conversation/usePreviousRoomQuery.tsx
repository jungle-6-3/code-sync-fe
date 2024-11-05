import {
  getPreviousRoom,
  getPreviousRoomsApi,
} from "@/apis/room/previousRoomApi";
import { useQuery } from "@tanstack/react-query";

export const usePreviousRoomsQuery = (currentPage: number) => {
  const {
    data: previousRoom,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["rooms", currentPage],
    queryFn: () => getPreviousRoomsApi(currentPage),
  });

  return { previousRoom, isError, isLoading };
};

export const usePreviousRoomQuery = (roomId: string) => {
  const {
    data: roomData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getPreviousRoom(roomId),
  });

  return { roomData, isError, isLoading };
};
