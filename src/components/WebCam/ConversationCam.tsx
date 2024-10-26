import { userMediaStore } from "@/stores/userMedia.store";
import { RefObject, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ConversationCamProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ConversationCam = ({ containerRef }: ConversationCamProps) => {
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
    <motion.div
      className="absolute z-[999999] max-w-[18rem] cursor-grab rounded-md border border-slate-200"
      drag
      dragElastic={0.65}
      dragConstraints={containerRef}
      whileTap={{ scale: 0.95 }}
    >
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
    </motion.div>
  );
};

export default ConversationCam;
