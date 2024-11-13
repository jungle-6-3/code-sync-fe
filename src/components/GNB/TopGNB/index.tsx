import TopGNBCopyUrl from "@/components/GNB/TopGNB/CopyUrl";
import ExitButton from "@/components/GNB/TopGNB/ExitButton";
import TopGNBMicStatus from "@/components/GNB/TopGNB/MicStatus";
import TopGNBRecordStatus from "@/components/GNB/TopGNB/RecordStatus";
import TopGNBSharedVideoShowStatus from "@/components/GNB/TopGNB/SharedVideoShowStatus";
import TopGNBVideoStatus from "@/components/GNB/TopGNB/VideoStatus";
import TopGNBWifiStatus from "@/components/GNB/TopGNB/WifiStatus";

const TopGNB = () => {
  return (
    <ul className="flex px-4 text-sm text-slate-700">
      <div className="flex flex-1 justify-start overflow-hidden">
        <TopGNBCopyUrl />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <ExitButton />
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
