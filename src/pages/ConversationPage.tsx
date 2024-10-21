// import { useParams } from "react-router-dom";

const ConversationPage = () => {
  // const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex max-h-screen flex-1">
        <nav className="w-20 bg-slate-400">nav</nav>
        <div className="w-64 bg-yellow-300">left</div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1">body</div>
          <div className="h-52 bg-lime-300">bottom</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
