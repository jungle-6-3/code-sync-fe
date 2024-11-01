import { Excalidraw } from "@excalidraw/excalidraw";
import * as Y from "yjs";
import { ExcalidrawBinding, yjsToExcalidraw } from "y-excalidraw";
import { useEffect, useRef } from "react";
import { yjsStore } from "@/stores/yjs.store";
import { drawBoardStore } from "@/stores/drawBoard.store";

export const DrawBoard = () => {
  const api = drawBoardStore((state) => state.api);
  const setApi = drawBoardStore((state) => state.setApi);
  const binding = drawBoardStore((state) => state.binding);
  const setBindings = drawBoardStore((state) => state.setBinding);
  const excalidrawRef = useRef(null);
  const provider = yjsStore((state) => state.provider);
  const yElements = yjsStore((state) =>
    state.ydoc.getArray<Y.Map<unknown>>("elements"),
  );
  const yAssets = yjsStore((state) => state.ydoc.getMap("assets"));

  useEffect(() => {
    if (!api) return;
    if (!excalidrawRef.current) return;

    provider?.awareness.setLocalStateField("user", {
      color: "#30bced",
      colorLight: "#30bced33",
    });

    if (!binding) {
      const binding = new ExcalidrawBinding(
        yElements,
        yAssets,
        api,
        provider?.awareness,
        // excalidraw dom is needed to override the undo/redo buttons in the UI as there is no way to override it via props in excalidraw
        // You might need to pass {trackedOrigins: new Set()} to undomanager depending on whether your provider sets an origin or not
        {
          excalidrawDom: excalidrawRef.current,
          undoManager: new Y.UndoManager(yElements),
        },
      );
      setBindings(binding);
    }

    return () => {
      binding?.destroy();
    };
  }, [api, provider, yElements, yAssets, binding, setBindings]);

  const initData = {
    elements: yjsToExcalidraw(yElements),
  };

  return (
    <div ref={excalidrawRef} className="h-full w-full">
      <Excalidraw
        initialData={initData}
        excalidrawAPI={setApi}
        onPointerUpdate={(payload) =>
          binding && binding.onPointerUpdate(payload)
        }
        theme="light"
      />
    </div>
  );
};
