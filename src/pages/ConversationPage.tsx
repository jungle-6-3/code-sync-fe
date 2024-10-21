import { useParams } from "react-router-dom";

const ConversationPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <div>
      <h1>Conversation</h1>
      <p>Conversation ID: {conversationId}</p>
    </div>
  );
};

export default ConversationPage;
