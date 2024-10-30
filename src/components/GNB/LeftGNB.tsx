import chattingRoomStore from "@/stores/chattingRoom.store";
import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";

interface LeftGNBProps {
  toggleDrawBoard(): void;
}

const LeftGNB = ({ toggleDrawBoard }: LeftGNBProps) => {
  const { setIsMessage } = chattingRoomStore();
  return (
    <ul className="flex h-full flex-col justify-between">
      <div>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setIsMessage("folder")}>
            <Folder color="#334155" />
          </button>
        </li>
        <li className="aspect-square">
          <button className="p-2" onClick={() => setIsMessage("message")}>
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
          <button className="p-2" onClick={toggleDrawBoard}>
            <SquarePen color="#334155" />
          </button>
        </li>
      </div>
    </ul>
  );
};

export default LeftGNB;
