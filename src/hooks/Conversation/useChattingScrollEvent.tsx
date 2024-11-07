import { SocketManager } from "@/lib/socketManager";
import { chattingPreviewStore } from "@/stores/chattingMessage.store";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect, useRef, useState } from "react";

const useChattingScrollEvent = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const clearMessages = chattingPreviewStore((state) => state.clearMessages);
  const [isScrollAtBottom, setisScrollAtBottom] = useState(true);
  const previewMessage = chattingPreviewStore((state) => state.messages);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  // 스크롤이 위에 있을시 미리보기채팅이 보이게하는 로직
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const messagesEnd = messagesEndRef.current;
    if (!chatContainer) return;
    if (!messagesEnd) return;
    if (messagesEnd.scrollTop >= 0) clearMessages();

    const handleScroll = () => {
      const isAtBottom = chatContainer.scrollTop >= 0;
      if (isAtBottom) clearMessages();
      setisScrollAtBottom(isAtBottom);
    };

    chatContainer.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [clearMessages]);

  useEffect(() => {
    const deletePreview = () => {
      if (isScrollAtBottom) return clearMessages();
    };
    socket.on("chatting", deletePreview);
    return () => {
      socket.off("chatting", deletePreview);
    };
  }, [socket, clearMessages, isScrollAtBottom]);

  const onClickPreview = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 미리보기에서 제일 최근 메세지를 가져오는 로직
  const lastMessage = previewMessage[0];

  return {
    messagesEndRef,
    chatContainerRef,
    isScrollAtBottom,
    lastMessage,
    onClickPreview,
  };
};

export default useChattingScrollEvent;
