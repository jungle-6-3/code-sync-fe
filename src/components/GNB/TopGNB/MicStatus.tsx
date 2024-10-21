import { Mic, MicOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBMicStatus = () => {
  const [micStatus, toggleMicStatus] = useReducer((state) => !state, true);

  const onMicClick = () => {
    toggleMicStatus();
  };

  const onMicStopClick = () => {
    toggleMicStatus();
  };

  return (
    <li>
      {micStatus ? (
        <button onClick={onMicStopClick}>
          <Mic color="#334155" size={16} />
        </button>
      ) : (
        <button onClick={onMicClick}>
          <MicOff color="#334155" size={16} />
        </button>
      )}
    </li>
  );
};

export default TopGNBMicStatus;
