import { Badge } from "@/components/ui/badge";
import { SocketManager } from "@/lib/socketManager";
import chattingRoomStore from "@/stores/chattingRoom.store";
import { fileSysyemStore } from "@/stores/github.store";
import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

const LeftGNB = () => {
  const setLeftSNBSelection = chattingRoomStore(
    (state) => state.setLeftSNBSelection,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const isMessage = chattingRoomStore((state) => state.isMessage);
  const [messageCount, setMessageCount] = useState(0);

  const setNavigate = (filename: string) =>
    setSelectedCommitFile({
      additions: 0,
      afterContent: "",
      beforeContent: "",
      deletions: 0,
      filename: filename,
      language: "",
      status: "init",
    });

  const socket = SocketManager.getInstance().socketIOSocket;
  useEffect(() => {
    setMessageCount(0);
  }, [isMessage]);

  useEffect(() => {
    const countChatting = () => {
      setMessageCount(messageCount + 1);
    };
    socket.on("chatting", countChatting);
    return () => {
      socket.off("chatting", countChatting);
    };
  }, [socket, messageCount]);

  const onResetCount = () => {
    setMessageCount(0);
  };

  return (
    <ul className="flex h-full flex-col justify-between">
      <div>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection(false)}>
            <Folder color="#334155" />
          </button>
        </li>
        <li className="relative aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection(true)}>
            <MessageSquare color="#334155" onClick={onResetCount} />
            {messageCount > 0 && isMessage === false && (
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center text-xs">
                <Badge className = "flex items-center justify-center h-4 w-4 rounded-full p-0 text-[10px] text-center" variant="destructive">{messageCount}</Badge>
              </span>
            )}
          </button>
        </li>
      </div>
      <div>
        <li className="aspect-square">
          <button className="p-2">
            <NotepadText color="#334155" />
          </button>
        </li>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setNavigate("MainDrawBoard")}>
            <SquarePen color="#334155" />
          </button>
        </li>
      </div>
    </ul>
  );
};

export default LeftGNB;
