import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { userMediaStore } from "@/stores/userMedia.store";
import { WebCamVideoButton, WebCamAudioButton } from "@/components/WebCam";
import { socketStore } from "@/stores/socket.store";
import { SpinIcon } from "@/components/icons";
import { peerStore } from "@/stores/peer.store";
import { addStreamConnectionAtPeer } from "@/lib/peer";

interface ConversationReadyPageProps {
  onSetJoin: (online: boolean) => void;
}

const ConversationReadyPage = ({ onSetJoin }: ConversationReadyPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const socket = socketStore((state) => state.socket);
  const createPeer = peerStore((state) => state.createPeer);
  const roomId = window.location.pathname.split("/")[1];
  const setSocket = socketStore((state) => state.setSocket);
  const isCreator = socketStore((state) => state.isCreator);

  const onStartConversation = async () => {
    if (isLoaded) return;
    setIsRejected(false);
    setIsLoaded(true);
    if (isUserMediaOn.audio) {
      try {
        const [{ id: peerId, peer }, socket] = await Promise.all([
          createPeer(),
          setSocket(roomId),
        ]);
        // initialize the peer connection
        // cuz of this work only when the socket and peer on the ready state
        addStreamConnectionAtPeer(peer, peerId, socket);

        if (isCreator) return onSetJoin(true);
        // when the user is not the creator
        socket
          .on("invite-accepted", () => {
            onSetJoin(true);
            socket?.emit("share-peer-id", { peerId });
            
          })
          .on("invite-rejected", () => {
            setIsLoaded(false);
            setIsRejected(true);
          });
      } catch (error) {
        alert("Error: " + error);
      }

      return;
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    return () => {
      socket?.off("invite-accepted").off("invite-rejected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Button onClick={onStartConversation}>
          {isLoaded ? <SpinIcon /> : "Start Conversation"}
        </Button>
        {isRejected && <p>Conversation rejected</p>}
      </div>
    </div>
  );
};

export default ConversationReadyPage;
