import { userMediaStore } from "@/stores/userMedia.store";
import { Airplay } from "lucide-react";

const TopGNBSharedVideoShowStatus = () => {
  const toggleShowWebcam = userMediaStore(
    (state) => state.toggleShowSharedWebcam,
  );

  return (
    <li>
      <button className="flex gap-2" onClick={toggleShowWebcam}>
        사용자 화면 보기
        <Airplay color="#334155" size={16} />
      </button>
    </li>
  );
};

export default TopGNBSharedVideoShowStatus;
