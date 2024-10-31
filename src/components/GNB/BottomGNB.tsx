import { prInfoStore } from "@/stores/github.store";

export const BottomGNB = () => {
  const prUrl = prInfoStore((state) => state.prInfo.prUrl);
  return (
    <div className="bg-blue-400 p-1">
      <a href={prUrl} target="_blank" rel="noopener noreferrer">
        {prUrl}
      </a>
    </div>
  );
};
