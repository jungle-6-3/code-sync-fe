import { Excalidraw } from "@excalidraw/excalidraw";
import * as Y from "yjs";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawBinding, yjsToExcalidraw } from "y-excalidraw";
import { useEffect, useRef, useState } from "react";
import { socketManager } from "@/lib/socketManager";

const usercolors = [{ color: "#30bced", light: "#30bced33" }];

export const DrawBoard = () => {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const [binding, setBindings] = useState<ExcalidrawBinding | null>(null);
  const excalidrawRef = useRef(null);
  const provider = socketManager.yjsSocket?.provider;
  const yElements =
    socketManager.yjsSocket?.ydoc.getArray<Y.Map<unknown>>("elements");
  const yAssets = socketManager.yjsSocket?.ydoc.getMap("assets");

  useEffect(() => {
    if (!api) return;
    if (!excalidrawRef.current) return;
    if (yElements === undefined || yAssets === undefined) return;

    provider?.awareness.setLocalStateField("user", {
      color: usercolors[0].color,
      colorLight: usercolors[0].light,
    });

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

    return () => {
      setBindings(null);
      binding.destroy();
    };
  }, [api, provider, yElements, yAssets]);

  const initData = {
    elements: yjsToExcalidraw(yElements || new Y.Array<Y.Map<unknown>>()),
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
