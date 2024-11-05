import { useEffect, useRef, useState } from "react";
import { chattingMessageStore } from "@/stores/chattingMessage.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { SocketManager } from "@/lib/socketManager";
import { PreviewChatting } from "@/pages/conversation/PreviewChatting";

export default function ConversationChatting() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const addMessage = chattingMessageStore((state) => state.addMessage);
  const messages = chattingMessageStore((state) => state.messages);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  const [isUserMessage, setIsUserMessage] = useState(false);
  const [isScrollAtTop, setIsScrollAtTop] = useState(false);

  // 내가 채팅을 보낼시 스크롤을 자동으로 아래로 내리는 로직
  useEffect(() => {
    if (isUserMessage === true) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsUserMessage(false);
    }
  }, [isUserMessage]);

  // 스크롤이 위에 있을시 미리보기채팅이 보이게하는 로직
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const isAtTop = chatContainer.scrollTop === 0;
      setIsScrollAtTop(isAtTop);
    };

    chatContainer.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      socket.emit(
        "chatting",
        { message },
        (data: {
          name: string;
          message: string;
          date: Date;
          email: string;
        }) => {
          const newDate = new Date(data.date);
          //TODO "나"말고 더 좋은 것으로 바꾸기.
          addMessage({ date: newDate, name: "나", message: message });
          setIsUserMessage(true);
        },
      );
      setMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  // 미리보기에서 제일 최근 메세지를 가져오는 로직
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div
        id="chat"
        ref={chatContainerRef}
        className="relative flex h-[calc(100vh-8.3rem)] flex-col-reverse overflow-y-auto"
      >
        <ul className="[&:>]:-order-1 absolute bottom-0 flex w-full flex-1 flex-col">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex items-end px-2 ${
                msg.name === "나" ? "justify-end" : "justify-start"
              } my-1`}
            >
              <div
                className={`max-w-xs rounded-lg p-2 ${
                  msg.name === "나"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <span className="text-xs font-bold">{msg.name}</span>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs">{msg.date.toLocaleTimeString()}</p>
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>
      {!isScrollAtTop && lastMessage && <PreviewChatting user={lastMessage} />}
      <form onSubmit={onSubmit} className="p-2">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            placeholder="대화창"
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">보내기</Button>
        </div>
      </form>
    </>
  );
}
