import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useExit = () => {
  const navigat = useNavigate();
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  const isCreator = userMediaStore((state) => state.isCreator);
  const onFinishing = useCommunicationStore((state) => state.onFinishing);
  if (!isSocketManagerReady) throw new Error("소켓이 준비되지 않았어요.");
  const socket = SocketManager.getInstance().socketIOSocket;

  useEffect(() => {
    socket.on("room-closed", () => {
      alert("방을 닫습니다.");
      navigat("/room/create");
    });
    return () => {
      socket.off("room-closed");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const exit = () => {
    onFinishing();
    if (!isCreator) {
      return;
    }
    socket.emit("close-room");
  };
  return { exit };
};
