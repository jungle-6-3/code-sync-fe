import { userMediaStore } from "@/stores/userMedia.store";
import { RefObject, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConversationCamProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ConversationCam = ({ containerRef }: ConversationCamProps) => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const peerMediaStream = userMediaStore((state) => state.opponentsMediaStream);
  const isShowWebcam = userMediaStore((state) => state.isShowWebcam);

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
      className={cn(
        "absolute right-12 top-12 z-[999999] max-w-[18rem] cursor-grab border border-slate-200",
        !isShowWebcam && "hidden",
      )}
      drag
      dragElastic={0.65}
      dragConstraints={containerRef}
      whileTap={{ scale: 0.95 }}
    >
      {mediaStream && (
        <video
          ref={myVideoRef}
          autoPlay
          muted
          className="aspect-[16/10] w-full -scale-x-100 transform bg-slate-200 object-cover"
        />
      )}
      {peerMediaStream[0] && (
        <video
          ref={peerVideoRef}
          autoPlay
          className="aspect-[16/10] w-full -scale-x-100 transform bg-slate-200 object-cover"
        />
      )}
    </motion.div>
  );
};

export default ConversationCam;
