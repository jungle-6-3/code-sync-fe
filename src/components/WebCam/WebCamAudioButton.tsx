import { Button } from "@/components/ui/button";
import { userMediaStore } from "@/stores/userMedia.store";
import { Mic, MicOff } from "lucide-react";

interface WebCamAudioButtonProps {
  buttonClassName?: string;
}

const WebCamAudioButton = ({
  buttonClassName = "rounded-full border bg-slate-50 p-6",
}: WebCamAudioButtonProps) => {
  const isUserMediaOn = userMediaStore((state) => state.isUserMediaOn);
  const startWebcam = userMediaStore((state) => state.startWebcam);
  const stopWebcam = userMediaStore((state) => state.stopWebcam);

  return isUserMediaOn.audio ? (
    <Button
      onClick={() => stopWebcam({ audio: false, video: isUserMediaOn.video })}
      variant="link"
      size="icon"
      className={buttonClassName}
    >
      <Mic />
    </Button>
  ) : (
    <Button
      onClick={() => startWebcam({ audio: true, video: isUserMediaOn.video })}
      variant="link"
      size="icon"
      className={buttonClassName}
    >
      <MicOff />
    </Button>
  );
};

export default WebCamAudioButton;
