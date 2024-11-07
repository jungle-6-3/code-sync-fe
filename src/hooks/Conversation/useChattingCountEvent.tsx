import { SocketManager } from "@/lib/socketManager";
import { chattingPreviewStore } from "@/stores/chattingMessage.store";
import { sectionSelectStore } from "@/stores/chattingRoom.store";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect, useState } from "react";

const useChattingCountEvent = () => {
  const [messageCount, setMessageCount] = useState(0);
  const currentLeftSection = sectionSelectStore((state) => state.leftSection);
  const clearMessages = chattingPreviewStore((state) => state.clearMessages);

  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const socket = SocketManager.getInstance().socketIOSocket;

  useEffect(() => {
    if (currentLeftSection == "chat") setMessageCount(0);
  }, [currentLeftSection]);

  useEffect(() => {
    const countChatting = () => {
      if (currentLeftSection != "chat") setMessageCount(messageCount + 1);
    };
    socket.on("chatting", countChatting);

    return () => {
      socket.off("chatting", countChatting);
    };
  }, [socket, messageCount, currentLeftSection]);

  const onResetCount = () => {
    setMessageCount(0);
    clearMessages();
  };

  return { messageCount, onResetCount };
};

export default useChattingCountEvent;
