interface ConversationSaveChatViewerProps {
  chats: {
    date: string;
    name: string;
    email: string;
    message: string;
  }[];
  voice: {
    date: string;
    name: string;
    email: string;
    message: string;
  }[];
}

const ConversationSaveChatViewer = ({
  chats,
  voice,
}: ConversationSaveChatViewerProps) => {
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
        <div className="h-[calc(100vh-16rem)] py-2">
          <div>
            {voice.map((voice) => {
              return (
                <div key={voice.date} className="flex gap-4 py-1">
                  <div className="flex w-1/12 items-center justify-center rounded border">
                    {voice.name}
                  </div>
                  <div className="w-11/12 rounded border px-4 py-1">
                    {voice.message}
                    <div>{voice.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSaveChatViewer;
