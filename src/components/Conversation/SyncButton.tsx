import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ADDITIONAL_FILES, fileSysyemStore } from "@/stores/github.store";

export const SyncButton = () => {
  const commitFileList = fileSysyemStore((state) => state.commitFileList);
  const selectedCommitFile = fileSysyemStore(
    (state) => state.selectedCommitFile,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const otherUserSelectedCommitFile = fileSysyemStore(
    (state) => state.otherUserSelectedCommitFile,
  );
  const navigateToOtherUserFile = () => {
    if (!otherUserSelectedCommitFile) return;
    switch (otherUserSelectedCommitFile) {
      case "MainDrawBoard":
        setSelectedCommitFile(ADDITIONAL_FILES.MainDrawBoard);
        break;
      case "BlockNote":
        setSelectedCommitFile(ADDITIONAL_FILES.BlockNote);
        break;
      default: {
        const findFile = commitFileList.find(
          (file) => file.filename === otherUserSelectedCommitFile,
        )!;
        setSelectedCommitFile(findFile);
        break;
      }
    }
  };
  return (
    <Button
      className={cn(
        "rounded-none border-b-2 border-blue-700 text-sm text-slate-800",
        otherUserSelectedCommitFile &&
          selectedCommitFile.filename !== otherUserSelectedCommitFile &&
          "bg-blue-500 text-white",
      )}
      onClick={navigateToOtherUserFile}
      size="sm"
      variant="ghost"
      disabled={
        !otherUserSelectedCommitFile ||
        otherUserSelectedCommitFile === selectedCommitFile.filename
      }
    >
      화면 동기화
    </Button>
  );
};
