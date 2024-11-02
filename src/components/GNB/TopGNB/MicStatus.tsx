import { socketManager } from "@/lib/socketManager";
import { Mic, MicOff } from "lucide-react";
import { useReducer } from "react";

const TopGNBMicStatus = () => {
  const [micStatus, toggleMicStatus] = useReducer((state) => !state, true);
  const peers = socketManager.peerConnection?.peers;

  const onMicToggle = () => {
    toggleMicStatus();
    if (!peers) return;
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
        <button onClick={onMicToggle}>
          <Mic color="#334155" size={16} />
        </button>
      ) : (
        <button onClick={onMicToggle}>
          <MicOff color="#334155" size={16} />
        </button>
      )}
    </li>
  );
};

export default TopGNBMicStatus;
