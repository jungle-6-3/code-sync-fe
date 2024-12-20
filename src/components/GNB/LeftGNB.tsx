import { Badge } from "@/components/ui/badge";
import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";
import useChattingCountEvent from "@/hooks/Conversation/useChattingCountEvent";
import { fileSysyemStore } from "@/stores/github.store";
import { sectionSelectStore } from "@/stores/chattingRoom.store";

const LeftGNB = () => {
  const setLeftSNBSelection = sectionSelectStore(
    (state) => state.setLeftSNBSelection,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const currentLeftSection = sectionSelectStore((state) => state.leftSection);

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

  const { messageCount, onResetCount } = useChattingCountEvent();

  return (
    <ul className="flex h-full flex-col justify-between">
      <div>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection("folder")}>
            <Folder color="#334155" />
          </button>
        </li>
        <li className="relative aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection("chat")}>
            <MessageSquare color="#334155" onClick={onResetCount} />
            {currentLeftSection != "chat" && messageCount > 0 && (
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center text-xs">
                <Badge
                  className="flex h-4 w-4 items-center justify-center rounded-full p-0 text-center text-[10px]"
                  variant="destructive"
                >
                  {messageCount}
                </Badge>
              </span>
            )}
          </button>
        </li>
      </div>
      <div>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setNavigate("BlockNote")}>
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
