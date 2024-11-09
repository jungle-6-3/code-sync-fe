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
  const updateChats = chats.map(chat => ({
    ...chat,
    status: "chat"
  }));
  
  const updateVoice = voice.map(voice => ({
    ...voice,
    status: "voice"
  }))

  const chatting = updateChats.concat(updateVoice);


  const sortedChatting = [...chatting].sort(function (a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  // console.log(sortedChatting);
  const chattingData = sortedChatting.map(chat => ({
    ...chat,
    date: new Date(chat.date).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})
  }));

  return (
    <div className="flex h-screen">
      <div className="w-full">
        <div className="h-[calc(100vh-16rem)] py-2">
          <ul className="[&:>]:-order-1 bottom-0 flex w-full flex-1 flex-col">
            {chattingData.map((chat) => (
              <li
                key={chat.date}
                className={`my-1 flex items-end px-2 justify-center ${
                  chat.status === "voice" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg p-2 ${
                    chat.name === chats[0].name
                      ? "bg-black text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <span className="text-xs font-bold">{chat.name}</span>
                  <p className="text-sm">{chat.message}</p>
                  <p className="text-xs">{chat.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversationSaveChatViewer;
