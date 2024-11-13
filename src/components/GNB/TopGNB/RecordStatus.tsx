import { Button } from "@/components/ui/button";
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
        <Button onClick={onRecordStopClick} variant="ghost" className="p-0">
          <Disc2 color="#334155" size={16} />
        </Button>
      ) : (
        <Button onClick={onRecordClick} variant="ghost" className="p-0">
          <Circle color="#334155" size={16} />
        </Button>
      )}
    </li>
  );
};

export default TopGNBRecordStatus;
