import { SocketManager } from "@/lib/socketManager";
import { sectionSelectStore } from "@/stores/chattingRoom.store";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect, useState } from "react";

const useChattingCountEvent = () => {
  const [messageCount, setMessageCount] = useState(0);
  const isMessage = sectionSelectStore((state) => state.leftSection);

  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const socket = SocketManager.getInstance().socketIOSocket;

  useEffect(() => {
    setMessageCount(0);
  }, [isMessage]);

  useEffect(() => {
    const countChatting = () => {
      setMessageCount(messageCount + 1);
    };
    socket.on("chatting", countChatting);

    return () => {
      socket.off("chatting", countChatting);
    };
  }, [socket, messageCount]);

  const onResetCount = () => {
    setMessageCount(0);
  };

  return { messageCount, onResetCount };
};

export default useChattingCountEvent;
