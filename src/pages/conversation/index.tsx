import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useState } from "react";

const ConversationJunctionPage = () => {
  const [isOnline, setIsOnline] = useState(false);

  const onSetOnline = () => {
    setIsOnline(true);
  };

  return (
    <div>
      {isOnline ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage setOnline={onSetOnline} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
