import { Button } from "@/components/ui/button";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { Video, VideoOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBVideoStatus = () => {
  const [videoStatus, toggleVideoStatus] = useReducer((state) => !state, true);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const mediaStream = userMediaStore((state) => state.mediaStream);

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
    mediaStream?.getTracks().forEach((track) => {
      if (track.kind === "video") {
        track.enabled = !videoStatus;
      }
    });
  };

  return (
    <li>
      {videoStatus ? (
        <Button onClick={onVideoToggle} variant="ghost" className="p-0">
          <Video color="#334155" size={16} />
        </Button>
      ) : (
        <Button onClick={onVideoToggle} variant="ghost" className="p-0">
          <VideoOff color="#334155" size={16} />
        </Button>
      )}
    </li>
  );
};

export default TopGNBVideoStatus;
