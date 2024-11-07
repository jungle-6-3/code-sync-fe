import { PatchConversationDatasRequest } from "@/apis/room/dtos";
import {
  getPreviousRoom,
  getPreviousRoomsApi,
  patchPreviousRoom,
} from "@/apis/room/previousRoomApi";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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
  } = useSuspenseQuery({
    queryKey: ["room", roomId],
    queryFn: () => getPreviousRoom(roomId),
  });

  return { roomData, isError, isLoading };
};

export const usePreviouseRoomPatchMutate = (dataPk: string) => {
  return useMutation({
    mutationFn: (data: PatchConversationDatasRequest) =>
      patchPreviousRoom(dataPk, data),
  });
};
