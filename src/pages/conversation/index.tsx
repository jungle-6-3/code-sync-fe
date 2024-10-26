import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { socketStore } from "@/stores/socket.store";
import { useEffect, useState } from "react";
import { peerStore } from "@/stores/peer.store";
import { usePeer } from "@/hooks/usePeer";
import { userMediaStore } from "@/stores/userMedia.store";
import { ConversationCam } from "@/components/WebCam";

interface SocketJoinRequestBy {
  message: string;
  data: {
    email: string;
    peerId: string;
  };
}

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const setSocket = socketStore((state) => state.setSocket);
  const setRoomUUid = socketStore((state) => state.setRoomUuid);
  const roomId = window.location.pathname.split("/")[1];
  const socket = socketStore((state) => state.socket);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const peer = peerStore((state) => state.peer);
  const peers = peerStore((state) => state.peers);
  const peerId = peerStore((state) => state.peerId);
  const addOpponentMediaStream = userMediaStore(
    (state) => state.addOpponentMediaStream,
  );
  const removeOpponentMediaStream = userMediaStore(
    (state) => state.removeOpponentMediaStream,
  );
  usePeer();

  useEffect(() => {
    if (!socket || !peer) return;
    socket.emit("share-peer-id", { peerId });
    socket.on(
      "new-peer-id",
      ({ data: { peerId: remotePeerId } }: SocketJoinRequestBy) => {
        if (peerId == remotePeerId || !mediaStream) return;
        const call = peer?.call(remotePeerId, mediaStream);
        if (!call) return;

        call.on("stream", (remoteStream) => {
          addOpponentMediaStream(remoteStream);
        });

        call.on("close", () => {
          removeOpponentMediaStream(call.remoteStream);
        });

        peers[remotePeerId] = call;
      },
    );

    return () => {
      socket.off("new-peer-id");
    };
  }, [peer]);

  useEffect(() => {
    setRoomUUid(roomId);
    setSocket();
  }, [roomId, setRoomUUid, setSocket]);

  const onSetJoin = () => {
    setIsJoin(true);
  };

  return (
    <>
      <ConversationCam />
      {isJoin ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage setJoin={onSetJoin} />
      )}
    </>
  );
};

export default ConversationJunctionPage;
