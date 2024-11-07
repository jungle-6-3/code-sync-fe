import { create } from "zustand";
import * as Y from "yjs";
interface PreviousRoomStore {
  drawBoard: string,
  setDrawBoard: (drawBoard: string) => void,
  drawBoardYdoc: Y.Doc,
  note: string,
  setNote: (note: string) => void,
  noteYdoc: Y.Doc,
  voice: string,
  setVoice: (voice: string) => void,
}

export const usePreviousRoomStore = create<PreviousRoomStore>()((set) => ({
  drawBoard: "",
  setDrawBoard: (drawBoard) => set({ drawBoard }),
  drawBoardYdoc: new Y.Doc(),
  note: "",
  setNote: (note) => set({ note }),
  noteYdoc: new Y.Doc(),
  voice: "",
  setVoice: (voice) => set({ voice }),
}));