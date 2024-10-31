import { useEffect, useState } from "react";
import { socketStore } from "@/stores/socket.store";
import { MainFrame } from "@/components/Frame/MainFrame";
import { LeftGNB, TopGNB } from "@/components/GNB";
import useJoinRequestByToast, {
  SocketJoinRequestBy,
} from "@/hooks/Toast/useJoinReqeustBy";
import useUserDisconnectedToast, {
  SocketUserDisconnected,
} from "@/hooks/Toast/useUserDisconnected";

const ConversationPage = () => {
  const socket = socketStore((state) => state.socket);
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();

  useEffect(() => {
    if (!socket) return;

    socket.on("join-request-by", ({ data, message }: SocketJoinRequestBy) => {
      onJoinRequestByToast({ data, message });
    });
    socket.on("user-disconnected", (data: SocketUserDisconnected) => {
      onUserDisconnectedToast(data);
    });

    return () => {
      // socket.disconnect();
      socket.off("join-request-by");
      socket.off("user-disconnected");
    };
  }, [socket, onJoinRequestByToast, onUserDisconnectedToast]);

  const [drawBoard, setDrawBoard] = useState(false);
  const navigateMainFrame = () => {
    setDrawBoard((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col">
      <nav className="border-b p-1">
        <TopGNB />
      </nav>
      <div className="flex h-full">
        <nav className="border-r">
          <LeftGNB navigateMainFrame={navigateMainFrame} />
        </nav>
        <MainFrame drawBoard={drawBoard} />
      </div>
      <div className="bg-blue-400 p-1">bottom status</div>
    </div>
  );
};

export default ConversationPage;
