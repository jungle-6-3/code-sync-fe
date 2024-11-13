import { Button } from "@/components/ui/button";
import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { Mic, MicOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBMicStatus = () => {
  const [micStatus, toggleMicStatus] = useReducer((state) => !state, true);
  const peers = SocketManager.getInstance().peerConnection.peers;
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!isSocketManagerReady) return null;

  const onMicToggle = () => {
    toggleMicStatus();
    // TODO: when toggle mic, other people know that I'm muted
    Object.values(peers).forEach((peer) => {
      peer.localStream.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !micStatus;
        }
      });
    });
  };

  return (
    <li>
      {micStatus ? (
        <Button onClick={onMicToggle} variant="ghost" className="p-0">
          <Mic color="#334155" size={16} />
        </Button>
      ) : (
        <Button onClick={onMicToggle} variant="ghost" className="p-0">
          <MicOff color="#334155" size={16} />
        </Button>
      )}
    </li>
  );
};

export default TopGNBMicStatus;
