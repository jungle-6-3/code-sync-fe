import { useSaveMeetingMutation } from "@/hooks/Conversation/useSaveMeetingMutation";
import { drawBoardStore } from "@/stores/drawBoard.store";
import { exportToBlob } from "@excalidraw/excalidraw";

export const useExit = () => {
  const api = drawBoardStore((state) => state.api);
  const saveMeetingMutation = useSaveMeetingMutation();

  const exit = () => {
    if (!confirm("종료하실껀가요?")) return;
    if (!api) return;
    exportToBlob({
      elements: api.getSceneElements(),
      appState: {
        ...api.getAppState(),
        exportWithDarkMode: false,
      },
      files: api.getFiles(),
    }).then((blob) => {
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.download = "excalidraw.png";
      // a.href = url;
      // a.click();
    });
  };
  return { exit };
};
