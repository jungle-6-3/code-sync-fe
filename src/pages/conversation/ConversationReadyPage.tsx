import { useEffect, useRef, useState } from "react";
import { userMediaStore } from "@/stores/userMedia.store";
import { fileSysyemStore, prMetaDataStore } from "@/stores/github.store";
import { Button } from "@/components/ui/button";
import { SpinIcon } from "@/components/icons";
import { WebCamVideoButton, WebCamAudioButton } from "@/components/WebCam";
import { extractGitHubPrDetails } from "@/lib/github";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { SocketManager } from "@/lib/socketManager";

interface ConversationReadyPageProps {
  onSetJoin: (online: boolean) => void;
}

interface InviteAcceptedRespone {
  prUrl: string;
  role: "creator" | "participant";
}

const ConversationReadyPage = ({ onSetJoin }: ConversationReadyPageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const isStartVideoWebCam = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const onStaging = useCommunicationStore((state) => state.onStaging);
  const roomUuid = window.location.pathname.split("/")[1];
  const setPrMetaDataInfo = prMetaDataStore((state) => state.setPrMetaData);
  const setCommitFileList = fileSysyemStore((state) => state.setCommitFileList);
  const isCreator = userMediaStore((state) => state.isCreator);
  const setIsCreator = userMediaStore((state) => state.setIsCreator);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  const onStartConversation = async () => {
    if (isLoaded) return;
    if (!isUserMediaOn.audio) return;
    setIsRejected(false);
    setIsLoaded(true);
    try {
      const socketManger = await onStaging({ roomUuid });
      if (isCreator) {
        return onSetJoin(true);
      }
      // when the user is not the creator
      socketManger.socketIOSocket
        ?.on(
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
            socketManger.socketIOSocket?.emit("share-peer-id", {
              peerId: socketManger.peerConnection.id,
            });
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
      if (!isSocketManagerReady) return;
      SocketManager.getInstance()
        .socketIOSocket?.off("invite-accepted")
        .off("invite-rejected");
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
