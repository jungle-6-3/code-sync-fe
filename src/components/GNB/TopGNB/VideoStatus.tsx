import { userMediaStore } from "@/stores/userMedia.store";
import { Video, VideoOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBVideoStatus = () => {
  const [videoStatus, toggleVideoStatus] = useReducer((state) => !state, true);
  const mediaStatus = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const stopWebcam = userMediaStore((state) => state.stopWebcam);

  const onVideoClick = () => {
    toggleVideoStatus();
    startWebcam({ audio: mediaStatus.audio, video: true });
  };

  const onVideoStopClick = () => {
    toggleVideoStatus();
    stopWebcam({ audio: mediaStatus.audio, video: false });
  };

  return (
    <li>
      {videoStatus ? (
        <button onClick={onVideoStopClick}>
          <Video color="#334155" size={16} />
        </button>
      ) : (
        <button onClick={onVideoClick}>
          <VideoOff color="#334155" size={16} />
        </button>
      )}
    </li>
  );
};

export default TopGNBVideoStatus;
