import { Switch } from "@/components/ui/switch";
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

const ConversationShareDrawBoardViewer = ({
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
  const drawIsShared = usePreviousRoomStore((state) => state.drawIsShared);
  const setDrawIsShared = usePreviousRoomStore(
    (state) => state.setDrawIsShared,
  );

  useEffect(() => {
    if (!api) return;
    const newBinding = new ExcalidrawBinding(yElements, yAssets, api);
    setBinding(newBinding);
    return () => {
      newBinding.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  useEffect(() => {
    if (drawBoard.length !== 0) {
      const binaryEncoded = toUint8Array(drawBoard);
      Y.applyUpdate(ydoc, binaryEncoded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawBoard]);

  useEffect(() => {
    if (drawBoard.length === 0) {
      setDrawBoard(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-10 flex justify-end gap-4 text-sm font-light">
        {drawIsShared ? "공개" : "비공개"}
        <Switch checked={drawIsShared} onCheckedChange={setDrawIsShared} />
      </div>
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
    </>
  );
};

export default ConversationShareDrawBoardViewer;
