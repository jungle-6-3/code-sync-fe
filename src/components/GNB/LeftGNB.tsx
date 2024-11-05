import { Badge } from "@/components/ui/badge";
import useChattingCountEvent from "@/hooks/Conversation/useChattingCountEvent";
import { sectionSelectStore } from "@/stores/chattingRoom.store";
import { fileSysyemStore } from "@/stores/github.store";
import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";

const LeftGNB = () => {
  const setLeftSNBSelection = sectionSelectStore(
    (state) => state.setLeftSNBSelection,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const isMessage = sectionSelectStore((state) => state.leftSection);

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
            {messageCount > 0 && isMessage === "folder" && (
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
