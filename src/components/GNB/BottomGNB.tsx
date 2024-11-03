import { prMetaDataStore } from "@/stores/github.store";
import { Link } from "react-router-dom";

export const BottomGNB = () => {
  const prUrl = prMetaDataStore((state) => state.prMetaData.prUrl);
  return (
    <div className="border-t">
      <Link
        to={prUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="p-1 px-3 text-sm"
      >
        View on GitHub ↗
      </Link>
    </div>
  );
};
