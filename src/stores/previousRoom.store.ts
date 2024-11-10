import { create } from "@/lib/zustand";
import * as Y from "yjs";
interface PreviousRoomStore {
  drawBoard: string,
  setDrawBoard: (drawBoard: string) => void,
  drawBoardYdoc: Y.Doc,
  setDrawBoardYdoc: (drawBoardYdoc: Y.Doc) => void,
  note: string,
  setNote: (note: string) => void,
  noteYdoc: Y.Doc,
  setNoteYdoc: (noteYdoc: Y.Doc) => void,
  voice: string,
  setVoice: (voice: string) => void,
  canShared: boolean,
  setCanShared: (canShared: boolean) => void,
}

export const usePreviousRoomStore = create<PreviousRoomStore>()((set) => ({
  drawBoard: "",
  setDrawBoard: (drawBoard) => set({ drawBoard }),
  drawBoardYdoc: new Y.Doc(),
  setDrawBoardYdoc: (drawBoardYdoc) => set({ drawBoardYdoc }),
  note: "",
  setNote: (note) => set({ note }),
  noteYdoc: new Y.Doc(),
  setNoteYdoc: (noteYdoc) => set({ noteYdoc }),
  voice: "",
  setVoice: (voice) => set({ voice }),
  canShared: false,
  setCanShared: (canShared) => set({ canShared }),
}));