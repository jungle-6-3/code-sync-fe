import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { socketStore } from "@/stores/socket.store";
import { useEffect, useRef, useState } from "react";
import { usePeer } from "@/hooks/usePeer";
import { ConversationCam } from "@/components/WebCam";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const socket = socketStore((state) => state.socket);
  const roomId = window.location.pathname.split("/")[1];
  const setSocket = socketStore((state) => state.setSocket);
  const { onCreatePeer } = usePeer();
  const constraintsRef = useRef(null);

  const onSetJoin = () => {
    setIsJoin(true);
    onCreatePeer();
  };

  useEffect(() => {
    setSocket(roomId);
  }, [setSocket, roomId]);

  // for remove side effect
  useEffect(() => {
    return () => {
      socket?.off("invite-accepted");
      socket?.off("invite-rejected");
    };
  }, [socket]);

  return (
    <div ref={constraintsRef}>
      <ConversationCam containerRef={constraintsRef} />
      {isJoin ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage setJoin={onSetJoin} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
