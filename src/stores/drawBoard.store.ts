import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawBinding } from "y-excalidraw";
import { create } from "zustand";

interface DrawBoardStore {
  api?: ExcalidrawImperativeAPI;
  setApi: (api?: ExcalidrawImperativeAPI) => void;
  binding?: ExcalidrawBinding;
  setBinding: (bindings?: ExcalidrawBinding) => void;
  exalidrawDom: HTMLDivElement | null;
  setExalidrawDom: (dom: HTMLDivElement | null) => void;
  isImageAdded: boolean;
  setIsImageAdded: (added: boolean) => void;
}

export const drawBoardStore = create<DrawBoardStore>((set, get) => ({
  setApi: (api) => set({ api }),
  setBinding: (binding) => set({ binding }),
  exalidrawDom: null,
  setExalidrawDom: (dom) => {
    if (get().exalidrawDom) return;
    set({ exalidrawDom: dom });
  },
  isImageAdded: false,
  setIsImageAdded: (added: boolean) => set({ isImageAdded: added }),
}));
