import { Excalidraw } from "@excalidraw/excalidraw";
import * as Y from "yjs";
import { ExcalidrawBinding, yjsToExcalidraw } from "y-excalidraw";
import { useEffect } from "react";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { SocketManager } from "@/lib/socketManager";
import { drawBoardStore } from "@/stores/drawBoard.store";
import {
  ExcalidrawImageElement,
  FileId,
} from "@excalidraw/excalidraw/types/element/types";
import { BinaryFileData } from "@excalidraw/excalidraw/types/types";

export const DrawBoard = () => {
  const api = drawBoardStore((state) => state.api);
  const setApi = drawBoardStore((state) => state.setApi);
  const binding = drawBoardStore((state) => state.binding);
  const setBindings = drawBoardStore((state) => state.setBinding);
  const excalidrawDom = drawBoardStore((state) => state.exalidrawDom);
  const setExcalidrawDom = drawBoardStore((state) => state.setExalidrawDom);
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );
  const isImageAdded = drawBoardStore((state) => state.isImageAdded);
  const setIsImageAdded = drawBoardStore((state) => state.setIsImageAdded);

  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socketManager = SocketManager.getInstance();
  const provider = socketManager.yjsSocket.provider;
  const yElements =
    socketManager.yjsSocket.ydoc.getArray<Y.Map<unknown>>("elements");
  const yAssets = socketManager.yjsSocket.ydoc.getMap("assets");

  useEffect(() => {
    if (!api) return;
    if (yElements === undefined || yAssets === undefined) return;

    provider?.awareness.setLocalStateField("user", {
      color: "#30bced",
      colorLight: "#30bced33",
    });

    return () => {
      // 사용자 상태 정리
      provider?.awareness.setLocalStateField("user", null);
    };
  }, [api, provider, yElements, yAssets, binding, setBindings]);

  useEffect(() => {
    let newBinding: ExcalidrawBinding | null = null;

    if (isSocketManagerReady && !binding && api && excalidrawDom) {
      newBinding = new ExcalidrawBinding(
        yElements,
        yAssets,
        api,
        provider?.awareness,
        {
          excalidrawDom: excalidrawDom,
          undoManager: new Y.UndoManager(yElements),
        },
      );
      setBindings(newBinding);
    }

    return () => {
      if (newBinding) {
        // ExcalidrawBinding 인스턴스 정리
        newBinding.destroy();
        setBindings(undefined);
      }
    };
  }, [
    isSocketManagerReady,
    api,
    excalidrawDom,
    yElements,
    yAssets,
    provider?.awareness,
    setBindings,
  ]);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 전체 상태 정리
      setApi(undefined);
      setExcalidrawDom(null);
    };
  }, []);

  useEffect(() => {
    if (!api || !binding || !isImageAdded) return;

    const timer = setTimeout(() => {
      const currentElements = api.getSceneElements();
      const fileId =
        `${Math.random().toString(36).substring(2, 15)}` as unknown as FileId;

      api.addFiles([
        {
          id: fileId,
          dataURL: sessionStorage.getItem('image'),
          mimeType: "image/png",
          created: Date.now(),
        } as BinaryFileData,
      ]);

      const baseImageElement = {
        type: "image" as const,
        fileId: fileId,
        status: "saved" as const,
        scale: [1, 1] as [number, number],
      };

      const imageElement: ExcalidrawImageElement = {
        ...baseImageElement,
        id: `${Date.now()}`,
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        angle: 0,
        strokeColor: "transparent",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        seed: Math.floor(Math.random() * 2000000000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 2000000000),
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
      };

      api.updateScene({
        elements: [...currentElements, imageElement],
      });

      setIsImageAdded(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [api, binding, isImageAdded, setIsImageAdded]);

  const initData = {
    elements: yjsToExcalidraw(yElements || new Y.Array<Y.Map<unknown>>()),
  };

  return (
    <div ref={(current) => setExcalidrawDom(current)} className="h-full w-full">
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
