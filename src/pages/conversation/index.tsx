import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useRef, useState } from "react";
import { usePeer } from "@/hooks/usePeer";
import { ConversationCam } from "@/components/WebCam";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const constraintsRef = useRef(null);
  usePeer();

  const onSetJoin = async () => {
    if (isJoin) return;
    setIsJoin(true);
  };

  return (
    <div ref={constraintsRef}>
      <ConversationCam containerRef={constraintsRef} />
      {isJoin ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage onSetJoin={onSetJoin} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
