import { peerStore } from "@/stores/peer.store";
import { Video, VideoOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBVideoStatus = () => {
  const [videoStatus, toggleVideoStatus] = useReducer((state) => !state, true);
  const peers = peerStore((state) => state.peers);

  const onVideoToggle = () => {
    toggleVideoStatus();
    // TODO: when toggle video, video change other image
    Object.values(peers).forEach((peer) => {
      peer.localStream.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !videoStatus;
        }
      });
    });
  };

  return (
    <li>
      {videoStatus ? (
        <button onClick={onVideoToggle}>
          <Video color="#334155" size={16} />
        </button>
      ) : (
        <button onClick={onVideoToggle}>
          <VideoOff color="#334155" size={16} />
        </button>
      )}
    </li>
  );
};

export default TopGNBVideoStatus;
