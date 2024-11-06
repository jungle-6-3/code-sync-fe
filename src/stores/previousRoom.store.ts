import { create } from "zustand";

interface PreviousRoomStore {
  drawBoard: string,
  setDrawBoard: (drawBoard: string) => void,
  note: string,
  setNote: (note: string) => void,
  voice: string,
  setVoice: (voice: string) => void,
}

export const usePreviousRoomStore = create<PreviousRoomStore>()((set) => ({
  drawBoard: "",
  setDrawBoard: (drawBoard) => set({ drawBoard }),
  note: "",
  setNote: (note) => set({ note }),
  voice: "",
  setVoice: (voice) => set({ voice }),
}));