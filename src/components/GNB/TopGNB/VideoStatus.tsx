import { Video, VideoOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBVideoStatus = () => {
  const [videoStatus, toggleVideoStatus] = useReducer((state) => !state, true);

  const onVideoClick = () => {
    toggleVideoStatus();
  };

  const onVideoStopClick = () => {
    toggleVideoStatus();
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
