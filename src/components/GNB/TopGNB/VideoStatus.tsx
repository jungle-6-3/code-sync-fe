import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { Video, VideoOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBVideoStatus = () => {
  const [videoStatus, toggleVideoStatus] = useReducer((state) => !state, true);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");

  const peers = SocketManager.getInstance().peerConnection.peers;

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
