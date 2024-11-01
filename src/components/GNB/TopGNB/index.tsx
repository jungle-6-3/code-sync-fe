import TopGNBMicStatus from "@/components/GNB/TopGNB/MicStatus";
import TopGNBRecordStatus from "@/components/GNB/TopGNB/RecordStatus";
import TopGNBSharedVideoShowStatus from "@/components/GNB/TopGNB/SharedVideoShowStatus";
import TopGNBVideoStatus from "@/components/GNB/TopGNB/VideoStatus";
import TopGNBWifiStatus from "@/components/GNB/TopGNB/WifiStatus";
import { Button } from "@/components/ui/button";

const TopGNB = () => {
  const url = window.location.href;

  const handleCopyClipBoard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      alert("클립보드에 복사되었습니다.");
    } catch (e) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  return (
    <ul className="flex px-4 text-sm text-slate-700">
      <div className="flex flex-1">
        <button onClick={() => handleCopyClipBoard(`${url}`)}>
          URL: {url}
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Button variant="outline" className="rounded-full px-4 py-0">
          종료하기
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <TopGNBWifiStatus />
        <TopGNBRecordStatus />
        <TopGNBVideoStatus />
        <TopGNBMicStatus />
        <TopGNBSharedVideoShowStatus />
      </div>
    </ul>
  );
};

export default TopGNB;
