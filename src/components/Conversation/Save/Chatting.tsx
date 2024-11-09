interface ConversationSaveChatViewerProps {
  chats: {
    date: string;
    name: string;
    email: string;
    message: string;
  }[];
}

interface ConversationSaveVoiceViewerProps {
  voice: {
    date: string;
    name: string;
    email: string;
    message: string;
  }[];
}

const ConversationSaveChatViewer = (
  { chats }: ConversationSaveChatViewerProps,
  { voice }: ConversationSaveVoiceViewerProps,
) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <div className="h-[calc(100vh-16rem)] w-40 py-2">
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
      </div>
      <div className="w-1/2">

      </div>
    </div>
  );
};

export default ConversationSaveChatViewer;
