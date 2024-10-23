import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useState } from "react";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);

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
