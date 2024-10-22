import { Airplay } from "lucide-react";

const TopGNBSharedVideoShowStatus = () => {
  return (
    <li>
      <button className="flex gap-2">
        사용자 화면 보기
        <Airplay color="#334155" size={16} />
      </button>
    </li>
  );
};

export default TopGNBSharedVideoShowStatus;
