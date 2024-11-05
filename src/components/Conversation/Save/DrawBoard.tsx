import { useFetcher } from "@/hooks/useFetcher";
import { Excalidraw } from "@excalidraw/excalidraw";
import { toUint8Array } from "js-base64";
import { yjsToExcalidraw } from "y-excalidraw";
import * as Y from "yjs";

interface ConversationSaveDrawBoardViewerProps {
  data: {
    url: string;
    isShared: boolean;
  };
}

const ConversationSaveDrawBoardViewer = ({
  data: { url },
}: ConversationSaveDrawBoardViewerProps) => {
  const { data } = useFetcher({ url });

  if (!data) return null;

  const ydoc = new Y.Doc();
  const binaryEndcoed = toUint8Array(data.data || "");
  Y.applyUpdate(ydoc, binaryEndcoed);

  const yElements = ydoc.getArray<Y.Map<unknown>>("elements");

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Excalidraw
        initialData={{
          elements: yjsToExcalidraw(yElements || new Y.Array<Y.Map<unknown>>()),
          appState: {
            viewModeEnabled: true,
          },
        }}
        theme="light"
      />
    </div>
  );
};

export default ConversationSaveDrawBoardViewer;
