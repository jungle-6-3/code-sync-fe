import { userMediaStore } from "@/stores/userMedia.store";
import { Mic, MicOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBMicStatus = () => {
  const [micStatus, toggleMicStatus] = useReducer((state) => !state, true);
  const mediaStatus = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const stopWebcam = userMediaStore((state) => state.stopWebcam);

  const onMicClick = () => {
    toggleMicStatus();
    startWebcam({ audio: true, video: mediaStatus.video });
  };

  const onMicStopClick = () => {
    toggleMicStatus();
    stopWebcam({ audio: false, video: mediaStatus.video });
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
