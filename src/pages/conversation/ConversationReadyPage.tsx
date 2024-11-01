import { useEffect, useRef, useState } from "react";
import { peerStore } from "@/stores/peer.store";
import { socketStore } from "@/stores/socket.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { fileSysyemStore, prMetaDataStore } from "@/stores/github.store";
import { Button } from "@/components/ui/button";
import { SpinIcon } from "@/components/icons";
import { WebCamVideoButton, WebCamAudioButton } from "@/components/WebCam";
import { extractGitHubPrDetails } from "@/lib/github";
import { addStreamConnectionAtPeer } from "@/lib/peer";
import { WebsocketProvider } from "y-websocket";
import { yjsStore } from "@/stores/yjs.store";

interface ConversationReadyPageProps {
  onSetJoin: (online: boolean) => void;
}

interface InviteAcceptedRespone {
  prUrl: string;
  role: "creator" | "participant";
}

const YJS_SOCKET = import.meta.env.VITE_YJS_URL || "wss://demos.yjs.dev/ws";

const ConversationReadyPage = ({ onSetJoin }: ConversationReadyPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const isStartVideoWebCam = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const socket = socketStore((state) => state.socket);
  const createPeer = peerStore((state) => state.createPeer);
  const roomId = window.location.pathname.split("/")[1];
  const setSocket = socketStore((state) => state.setSocket);
  const isCreator = socketStore((state) => state.isCreator);
  const setPrMetaDataInfo = prMetaDataStore((state) => state.setPrMetaData);
  const setCommitFileList = fileSysyemStore((state) => state.setCommitFileList);
  const setIsCreator = socketStore((state) => state.setIsCreator);
  const ydoc = yjsStore((state) => state.ydoc);
  const setProvider = yjsStore((state) => state.setProvider);

  const onStartConversation = async () => {
    if (isLoaded) return;
    if (!isUserMediaOn.audio) return;
    setIsRejected(false);
    setIsLoaded(true);
    try {
      // prepare sockets(peer, socketio, yjs)
      const [{ id: peerId, peer }, socket] = await Promise.all([
        createPeer(),
        setSocket(roomId),
      ]);
      const provider = new WebsocketProvider(YJS_SOCKET, roomId, ydoc, {
        connect: true,
        maxBackoffTime: 2500,
      });
      setProvider(provider);

      // initialize the peer connection
      // cuz of this work only when the socket and peer on the ready state
      addStreamConnectionAtPeer(peer, peerId, socket);

      if (isCreator) {
        return onSetJoin(true);
      }
      // when the user is not the creator
      socket
        .on(
          "invite-accepted",
          async ({ prUrl, role }: InviteAcceptedRespone) => {
            const { owner, repo, prNumber } = extractGitHubPrDetails({
              ghPrLink: prUrl,
            });
            setPrMetaDataInfo({
              owner,
              repo,
              prNumber: +prNumber,
              prUrl,
            });
            if (role === "creator") {
              await setCommitFileList({ owner, prNumber: +prNumber, repo })
                .then(() => {
                  onSetJoin(true);
                  setIsCreator(true);
                })
                .catch((error) => {
                  alert("Error: " + error);
                  setIsLoaded(false);
                });
              return;
            }
            onSetJoin(true);
            socket?.emit("share-peer-id", { peerId });
          },
        )
        .on("invite-rejected", () => {
          setIsLoaded(false);
          setIsRejected(true);
        });
    } catch (error) {
      alert("Error: " + error);
      setIsLoaded(true);
    }

    return;
  };

  useEffect(() => {
    if (!isStartVideoWebCam.current) {
      startWebcam({ audio: true, video: true });
      isStartVideoWebCam.current = true;
    }

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
          className="aspect-[16/10] w-full -scale-x-100 transform rounded-md bg-slate-200 object-cover"
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
