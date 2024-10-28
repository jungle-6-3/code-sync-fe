import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { socketStore } from "@/stores/socket.store";

export default function ConversationChatting() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = socketStore((state) => state.socket);
  useEffect(() => {
    if (!socket) return;
    // 소켓에서 메시지를 수신할 때마다 실행
    const handleChatting = (msg: string) => {
      try {
        console.log(msg); // 새로운 메시지를 상태에 추가
        setMessages((prevMessages) => [...prevMessages, msg]);
      } catch (e) {
        console.log(e);
      }
    };

    socket.on("chatting", handleChatting); // 이벤트 리스너 등록
    return () => {
      socket.off("chatting", handleChatting); // 언마운트 시 리스너 제거
    };
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!socket) return;
    try {
      socket.emit("chatting", message);
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="chat">
      <form onSubmit={handleSubmit}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <div className="fixed bottom-5 my-5 w-[177px]">
          <Input
            value={message}
            placeholder="대화창"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">보내기</Button>
        </div>
      </form>
    </div>
  );
}
