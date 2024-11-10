import { create } from "@/lib/zustand";
import { ExcalidrawBinding } from "y-excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

interface ImageSize {
  width: number;
  height: number;
}

interface IsAddedImageInfo {
  added: boolean;
  size: ImageSize;
}

interface DrawBoardStore {
  api?: ExcalidrawImperativeAPI;
  setApi: (api?: ExcalidrawImperativeAPI) => void;
  binding?: ExcalidrawBinding;
  setBinding: (bindings?: ExcalidrawBinding) => void;
  exalidrawDom: HTMLDivElement | null;
  setExalidrawDom: (dom: HTMLDivElement | null) => void;
  isAddedImageInfo: IsAddedImageInfo;
  setIsAddedImageInfo: (newImage: IsAddedImageInfo) => void;
  resetImageAdded: () => void;
}

const initialImageInfo: IsAddedImageInfo = {
  added: false,
  size: {
    width: 0,
    height: 0,
  },
};

export const drawBoardStore = create<DrawBoardStore>()((set, get) => ({
  api: undefined,
  binding: undefined,
  exalidrawDom: null,
  isAddedImageInfo: initialImageInfo,

  setApi: (api) => set({ api }),
  setBinding: (binding) => set({ binding }),
  setExalidrawDom: (dom) => {
    if (get().exalidrawDom) return;
    set({ exalidrawDom: dom });
  },
  setIsAddedImageInfo: (newImage) => set({ isAddedImageInfo: newImage }),
  resetImageAdded: () => set({ isAddedImageInfo: initialImageInfo }),
}));
