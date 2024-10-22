import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { Video, VideoOff } from "lucide-react";

interface ConversationReadyPageProps {
  setOnline: (online: boolean) => void;
}

const ConversationReadyPage = ({ setOnline }: ConversationReadyPageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isWebCamOn, setIsWebCamOn] = useState(false);

  const onStartConversation = () => {
    if (socket.connected) setOnline(true);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
      setIsWebCamOn(true);
    } catch (error) {
      alert("Error accessing webcam");
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
      setIsWebCamOn(false);
    }
  };

  useEffect(() => {
    // connecting when conversation ready page is mounted
    socket.connect();

    startWebcam();
  }, []);

  return (
    <div>
      <h1>Conversation Ready Page</h1>
      <Button onClick={onStartConversation}>Start Conversation</Button>
      <div className="relative w-full max-w-[40rem] p-8">
        <div className="absolute bottom-12 left-1/2 z-50 -translate-x-1/2 transform">
          {isWebCamOn ? (
            <Button
              onClick={stopWebcam}
              variant="ghost"
              size="icon"
              className="rounded-full border bg-slate-50 p-6"
            >
              <VideoOff />
            </Button>
          ) : (
            <Button
              onClick={startWebcam}
              variant="ghost"
              size="icon"
              className="rounded-full border bg-slate-50 p-6"
            >
              <Video />
            </Button>
          )}
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          className="aspect-[16/10] rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default ConversationReadyPage;
