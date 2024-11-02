import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types"
import { ExcalidrawBinding } from "y-excalidraw";
import { create } from "zustand"

interface DrawBoardStore {
  api?: ExcalidrawImperativeAPI;
  setApi: (api: ExcalidrawImperativeAPI) => void;
  binding?: ExcalidrawBinding
  setBinding: (bindings: ExcalidrawBinding) => void;
}

export const drawBoardStore = create<DrawBoardStore>((set) => ({
  setApi: (api) => set({ api }),
  setBinding: (binding) => set({ binding })
}))