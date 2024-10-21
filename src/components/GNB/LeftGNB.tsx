import { Folder, MessageSquare, NotepadText, SquarePen } from "lucide-react";

const LeftGNB = () => {
  return (
    <ul className="flex h-full flex-col justify-between">
      <div>
        <li className="aspect-square">
          <button className="p-2">
            <Folder color="#334155" />
          </button>
        </li>
        <li className="aspect-square">
          <button className="p-2">
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
          <button className="p-2">
            <SquarePen color="#334155" />
          </button>
        </li>
      </div>
    </ul>
  );
};

export default LeftGNB;
