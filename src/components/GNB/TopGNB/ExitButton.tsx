import { SpinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useExit } from "@/hooks/Conversation/useExit";
import { useState } from "react";

const ExitButton = () => {
  const { exit } = useExit();
  const [isExiting, setIsExiting] = useState(false);

  const onExit = () => {
    if (!confirm("종료하시겠습니까?")) return;
    setIsExiting(true);
    exit();
  };

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full px-4 py-0"
        onClick={onExit}
      >
        종료하기
      </Button>
      {isExiting && (
        <div className="fixed left-0 top-0 z-[9999] h-full w-full bg-slate-100/45 backdrop-blur-sm">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 transform">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-lg">
              <SpinIcon className="text-black" />
              <span>종료중...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExitButton;
