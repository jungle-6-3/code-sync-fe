import { userMediaStore } from "@/stores/userMedia.store";
import { useEffect, useRef } from "react";

const ConversationCam = () => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const peerMediaStream = userMediaStore((state) => state.opponentsMediaStream);

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = peerMediaStream[0];
    }
  }, [peerMediaStream]);

  return (
    <div className="absolute z-[999999] m-8 max-w-[18rem] cursor-grab rounded-md border">
      <video
        ref={myVideoRef}
        autoPlay
        muted
        className="aspect-[16/10] w-full rounded-t-md bg-slate-200 object-cover"
      />
      <video
        ref={peerVideoRef}
        autoPlay
        muted
        className="aspect-[16/10] w-full rounded-b-md bg-slate-200 object-cover"
      />
    </div>
  );
};

export default ConversationCam;
