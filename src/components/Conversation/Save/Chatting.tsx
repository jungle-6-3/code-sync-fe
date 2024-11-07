interface ConversationSaveChatViewerProps {
  chats: {
    date: string;
    name: string;
    email: string;
    message: string;
  }[];
}

const ConversationSaveChatViewer = ({
  chats,
}: ConversationSaveChatViewerProps) => {
  return (
    <div className="h-[calc(100vh-16rem)] py-2">
      <div>
        {chats.map((chat) => {
          return (
            <div key={chat.date} className="flex gap-4 py-1">
              <div className="flex w-1/12 items-center justify-center rounded border">
                {chat.name}
              </div>
              <div className="w-11/12 rounded border px-4 py-1">
                {chat.message}
                <div>{chat.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationSaveChatViewer;
