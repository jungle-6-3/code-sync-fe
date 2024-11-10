import { cn } from "@/lib/utils";

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
  const chatting = [
    ...chats.map((c) => ({ ...c, status: "chat" })),
    ...voice.map((v) => ({ ...v, status: "voice" })),
  ];

  const sortedChatting = [...chatting].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const chattingData = sortedChatting.map((chat) => ({
    ...chat,
    date: new Date(chat.date).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    }),
  }));

  return (
    <div className="flex">
      <div className="w-full">
        <div className="flex w-full items-center justify-center space-x-40">
          <p className="mb-4 text-center text-2xl font-bold">Chatting</p>
          <p className="mb-4 text-center text-2xl font-bold">Voice Text</p>
        </div>
        <div className="h-[calc(100vh-16rem)] py-2">
          {chattingData.map((chat, index) => (
            <div
              key={`${chat.date}-${index}`}
              className={cn([
                "mx-auto mb-4 flex w-full max-w-[90%] sm:max-w-[250px]",
                chat.status === "voice"
                  ? "translate-x-1/2"
                  : "-translate-x-1/2",
              ])}
            >
              <div className="flex p-3">
                <div
                  className={cn([
                    "mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold",
                    chat.name === chats[0].name
                      ? "bg-gray-300 text-black"
                      : "bg-black text-white",
                  ])}
                >
                  {chat.name[0]}
                </div>
                <div className="flex-1 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{chat.name}</p>
                  <p className="truncate">{chat.message}</p>
                  <p className="truncate text-xs">{chat.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationSaveChatViewer;
