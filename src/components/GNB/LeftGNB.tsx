import chattingRoomStore from "@/stores/chattingRoom.store";
import { fileSysyemStore } from "@/stores/github.store";
import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";

const LeftGNB = () => {
  const setLeftSNBSelection = chattingRoomStore(
    (state) => state.setLeftSNBSelection,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );

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

  return (
    <ul className="flex h-full flex-col justify-between">
      <div>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection("folder")}>
            <Folder color="#334155" />
          </button>
        </li>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setLeftSNBSelection("chat")}>
            <MessageSquare color="#334155" />
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
