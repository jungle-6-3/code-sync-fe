import { Button } from "@/components/ui/button";
import { userMediaStore } from "@/stores/userMedia.store";
import { Video, VideoOff } from "lucide-react";

interface WebCamVideoButtonProps {
  buttonClassName?: string;
}

const WebCamVideoButton = ({
  buttonClassName = "rounded-full border bg-slate-50 p-6",
}: WebCamVideoButtonProps) => {
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const stopWebcam = userMediaStore((state) => state.stopWebcam);

  return isUserMediaOn.video ? (
    <Button
      onClick={() => stopWebcam({ audio: isUserMediaOn.audio, video: false })}
      variant="ghost"
      size="icon"
      className={buttonClassName}
    >
      <Video />
    </Button>
  ) : (
    <Button
      onClick={() => startWebcam({ audio: isUserMediaOn.audio, video: true })}
      variant="ghost"
      size="icon"
      className={buttonClassName}
    >
      <VideoOff />
    </Button>
  );
};

export default WebCamVideoButton;
