import { sectionSelectStore } from "@/stores/chattingRoom.store";
import { prMetaDataStore } from "@/stores/github.store";
import { Link } from "react-router-dom";

const BottomGNB = () => {
  const prUrl = prMetaDataStore((state) => state.prMetaData.prUrl);
  const setBottomSection = sectionSelectStore(
    (state) => state.setBottomSection,
  );

  return (
    <div className="flex justify-between border-t">
      <Link
        to={prUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="p-1 px-3 text-sm"
      >
        View on GitHub ↗
      </Link>
      <button
        className="p-1 px-3 text-sm"
        onClick={() => setBottomSection("commit")}
      >
        Commit Information
      </button>
    </div>
  );
};

export default BottomGNB;
