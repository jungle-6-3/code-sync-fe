import { useFetcher } from "@/hooks/useFetcher";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { toUint8Array } from "js-base64";
import { useEffect, useRef, useState } from "react";
import { ExcalidrawBinding, yjsToExcalidraw } from "y-excalidraw";
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
  const exalidrawDomRef = useRef<HTMLDivElement | null>(null);
  const { data } = useFetcher({ url });
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const ydoc = new Y.Doc();
  const binaryEndcoed = toUint8Array(data.data);
  Y.applyUpdate(ydoc, binaryEndcoed);

  const yElements = ydoc.getArray<Y.Map<unknown>>("elements");
  const yAssets = ydoc.getMap("assets");

  useEffect(() => {
    if (!api || !exalidrawDomRef.current) return;
    const newBinding = new ExcalidrawBinding(
      yElements,
      yAssets,
      api,
      undefined,
      {
        excalidrawDom: exalidrawDomRef.current,
        undoManager: new Y.UndoManager(yElements),
      },
    );

    return () => {
      console.log(yElements.toJSON());
      newBinding.destroy();
    };
  }, [api, yElements, yAssets]);

  return (
    <div className="h-[calc(100vh-16rem)]" ref={exalidrawDomRef}>
      <Excalidraw
        initialData={{
          elements: yjsToExcalidraw(yElements),
        }}
        excalidrawAPI={setApi}
        theme="light"
      />
    </div>
  );
};

export default ConversationSaveDrawBoardViewer;
