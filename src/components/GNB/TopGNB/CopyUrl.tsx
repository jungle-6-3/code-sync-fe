import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

const TopGNBCopyUrl = () => {
  const urlPath = window.location.href.split("/").at(-1);

  const handleCopyClipBoard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  return (
    <Button
      onClick={() => handleCopyClipBoard(window.location.href)}
      variant="ghost"
      className="truncate p-0 text-left rtl:direction-normal"
    >
      <span className="truncate"> {`URL: ${urlPath}`}</span>
      <CopyIcon size="16" />
    </Button>
  );
};

export default TopGNBCopyUrl;
