import { useEffect, useRef, useState } from "react";
import { socketStore } from "@/stores/socket.store";
import { chattingMessageStore } from "@/stores/chattingMessage.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

class ChattingSocketResponse {
  name: string;
  message: string;
  email: string;
  date: Date;
  constructor({
    name,
    message,
    email,
    date,
  }: {
    name: string;
    message: string;
    email: string;
    date: string;
  }) {
    this.name = name;
    this.message = message;
    this.email = email;
    this.date = new Date(date);
  }
}

export default function ConversationChatting() {
  const [message, setMessage] = useState("");
  const socket = socketStore((state) => state.socket);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addMessage = chattingMessageStore((state) => state.addMessage);
  const messages = chattingMessageStore((state) => state.messages);

  useEffect(() => {
    if (!socket) return;
    const onChatting = (msg: {
      name: string;
      message: string;
      email: string;
      date: string;
    }) => {
      try {
        addMessage(new ChattingSocketResponse(msg));
      } catch (e) {
        console.error(e);
      }
    };

    socket.on("chatting", onChatting);
    return () => {
      socket.off("chatting", onChatting);
    };
  }, [socket, addMessage]);

  // TODO 후에 상대방이 채팅을 보냈을 시에도 내 스크롤은 내려가지않게
  // 또 내가 채팅을 보냈을때도 상대방 스크롤은 내려가지 않게
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!socket) return;
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
        },
      );
      setMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        id="chat"
        className="relative flex h-[calc(100vh-8.3rem)] flex-col-reverse overflow-y-auto"
      >
        <ul className="[&:>]:-order-1 absolute bottom-12 flex w-full flex-1 flex-col">
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
