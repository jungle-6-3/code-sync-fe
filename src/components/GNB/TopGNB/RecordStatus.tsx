import { useVoiceSave } from "@/hooks/Conversation/useVoiceSave";
import { Circle, Disc2 } from "lucide-react";
import { useReducer } from "react";

const TopGNBRecordStatus = () => {
  const [recordStatus, toggleRecordStatus] = useReducer(
    (state) => !state,
    false,
  );

  useVoiceSave(recordStatus);

  const onRecordClick = () => {
    toggleRecordStatus();
  };

  const onRecordStopClick = () => {
    toggleRecordStatus();
  };

  return (
    <li>
      {recordStatus ? (
        <button onClick={onRecordStopClick}>
          <Disc2 color="#334155" size={16} />
        </button>
      ) : (
        <button onClick={onRecordClick}>
          <Circle color="#334155" size={16} />
        </button>
      )}
    </li>
  );
};

export default TopGNBRecordStatus;
