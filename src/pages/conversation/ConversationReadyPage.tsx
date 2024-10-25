import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { userMediaStore } from "@/stores/userMedia.store";
import { WebCamVideoButton, WebCamAudioButton } from "@/components/WebCam";
import { socketStore } from "@/stores/socket.store";

interface ConversationReadyPageProps {
  setJoin: (online: boolean) => void;
}

const ConversationReadyPage = ({ setJoin }: ConversationReadyPageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const socket = socketStore((state) => state.socket);

  const onStartConversation = () => {
    if (socket?.connected && isUserMediaOn.audio) setJoin(true);
  };

  useEffect(() => {
    if (!!socket && !socket.connected) socket.connect();
  }, [socket]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    startWebcam({ audio: true, video: true });
  }, [startWebcam]);

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 max-lg:flex-col">
      <div className="relative aspect-[16/10] h-full w-full max-w-[40rem] p-8">
        <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 transform gap-4">
          <WebCamVideoButton />
          <WebCamAudioButton />
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          className="aspect-[16/10] w-full rounded-md bg-slate-200 object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <h1>Conversation Ready Page</h1>
        <Button onClick={onStartConversation}>Start Conversation</Button>
      </div>
    </div>
  );
};

export default ConversationReadyPage;
