import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { toUint8Array } from "js-base64";
import { useEffect, useRef, useState } from "react";
import { ExcalidrawBinding, yjsToExcalidraw } from "y-excalidraw";
import * as Y from "yjs";

interface ConversationSaveDrawBoardViewerProps {
  data: string;
}

const ConversationSaveDrawBoardViewer = ({
  data,
}: ConversationSaveDrawBoardViewerProps) => {
  const exalidrawDomRef = useRef<HTMLDivElement | null>(null);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const drawBoard = usePreviousRoomStore((state) => state.drawBoard);
  const setDrawBoard = usePreviousRoomStore((state) => state.setDrawBoard);

  const [binding, setBinding] = useState<ExcalidrawBinding | null>(null);
  const ydoc = usePreviousRoomStore((state) => state.drawBoardYdoc);
  const yElements = ydoc.getArray<Y.Map<unknown>>("elements");
  const yAssets = ydoc.getMap("assets");

  useEffect(() => {
    if (!api || !exalidrawDomRef.current) return;
    const newBinding = new ExcalidrawBinding(yElements, yAssets, api);
    setBinding(newBinding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  useEffect(() => {
    if (drawBoard) {
      const binaryEncoded = toUint8Array(drawBoard);
      Y.applyUpdate(ydoc, binaryEncoded);
    }
  }, [ydoc, drawBoard]);

  useEffect(() => {
    if (!drawBoard) {
      setDrawBoard(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[calc(100vh-16rem)] w-full" ref={exalidrawDomRef}>
      <Excalidraw
        initialData={{
          elements: yjsToExcalidraw(yElements),
        }}
        onPointerUpdate={(payload) =>
          binding && binding.onPointerUpdate(payload)
        }
        excalidrawAPI={setApi}
        theme="light"
      />
    </div>
  );
};

export default ConversationSaveDrawBoardViewer;
