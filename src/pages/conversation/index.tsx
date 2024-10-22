import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useState } from "react";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);

  const onSetJoin = () => {
    setIsJoin(true);
  };

  return (
    <div>
      {isJoin ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage setJoin={onSetJoin} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
