import { useEffect } from "react";
import { MainFrame } from "@/components/Frame/MainFrame";
import { LeftGNB, TopGNB, BottomGNB } from "@/components/GNB";
import useJoinRequestByToast, {
  SocketJoinRequestBy,
} from "@/hooks/Toast/useJoinReqeustBy";
import { useUserDisconnectedToast } from "@/hooks/Toast";
import { SocketUserDisconnected } from "@/hooks/Toast/useUserDisconnected";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { SocketManager } from "@/lib/socketManager";

const ConversationPage = () => {
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const socket = SocketManager.getInstance().socketIOSocket;

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

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <nav className="border-b p-1">
        <TopGNB />
      </nav>
      <div className="flex h-full">
        <nav className="border-r">
          <LeftGNB />
        </nav>
        <MainFrame />
      </div>
      <BottomGNB />
    </div>
  );
};

export default ConversationPage;
