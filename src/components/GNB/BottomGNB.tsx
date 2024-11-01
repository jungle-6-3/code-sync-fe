import {prMetaDataStore } from "@/stores/github.store";

export const BottomGNB = () => {
  const prUrl = prMetaDataStore((state) => state.prMetaData.prUrl);
  return (
    <div className="bg-blue-400 p-1">
      <a
        href={prUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        View on GitHub ↗
      </a>
    </div>
  );
};
