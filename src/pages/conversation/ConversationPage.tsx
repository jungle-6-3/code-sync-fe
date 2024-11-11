import { useEffect } from "react";
import { SocketJoinRequestBy } from "@/hooks/Toast/useJoinReqeustBy";
import { useJoinRequestByToast } from "@/hooks/Toast";
import { useUserDisconnectedToast } from "@/hooks/Toast";
import { SocketUserDisconnected } from "@/hooks/Toast/useUserDisconnected";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { SocketManager } from "@/lib/socketManager";
import { userMediaStore } from "@/stores/userMedia.store";
import { MainFrame } from "@/components/Frame/MainFrame";
import { LeftGNB, TopGNB, BottomGNB } from "@/components/GNB";

const ConversationPage = () => {
  const { onToast: onJoinRequestByToast } = useJoinRequestByToast();
  const { onToast: onUserDisconnectedToast } = useUserDisconnectedToast();
  const peers = SocketManager.getInstance().peerConnection.peers;
  const removeOpponentMediaStream = userMediaStore(
    (state) => state.removeOpponentMediaStream,
  );
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  useEffect(() => {
    socket.on("join-request-by", ({ data, message }: SocketJoinRequestBy) => {
      onJoinRequestByToast({ data, message });
    });
    socket.on("user-disconnected", (data: SocketUserDisconnected) => {
      peers[data.data.peerId].close();
      delete peers[data.data.peerId];
      removeOpponentMediaStream();
      onUserDisconnectedToast(data);
    });
    return () => {
      socket.off("join-request-by");
      socket.off("user-disconnected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers]);

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
