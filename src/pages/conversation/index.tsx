import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { socketStore } from "@/stores/socket.store";
import { useEffect, useState } from "react";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const setSocket = socketStore((state) => state.setSocket);
  const setRoomUUid = socketStore((state) => state.setRoomUuid);
  const roomId = window.location.pathname.split("/")[1];

  useEffect(() => {
    setRoomUUid(roomId);
    setSocket();
  }, [roomId, setRoomUUid, setSocket]);

  const onSetJoin = () => {
    setIsJoin(true);
  };

  return isJoin ? (
    <ConversationPage />
  ) : (
    <ConversationReadyPage setJoin={onSetJoin} />
  );
};

export default ConversationJunctionPage;
