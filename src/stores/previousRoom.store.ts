import { create } from "@/lib/zustand";
import * as Y from "yjs";

interface PreviousRoomStore {
  drawBoard: string;
  setDrawBoard: (drawBoard: string) => void;
  drawBoardYdoc: Y.Doc;
  setDrawBoardYdoc: (drawBoardYdoc: Y.Doc) => void;
  drawIsShared: boolean;
  setDrawIsShared: (drawIsShared: boolean) => void;

  note: string;
  setNote: (note: string) => void;
  noteYdoc: Y.Doc;
  setNoteYdoc: (noteYdoc: Y.Doc) => void;
  noteIsShared: boolean;
  setNoteIsShared: (noteIsShared: boolean) => void;

  chatIsShared: boolean;
  setChatIsShared: (chatIsShared: boolean) => void;

  voice: string;
  setVoice: (voice: string) => void;
  voiceIsShared: boolean;
  setVoiceIsShared: (voiceIsShared: boolean) => void;

  canShared: boolean;
  setCanShared: (canShared: boolean) => void;
}

export const usePreviousRoomStore = create<PreviousRoomStore>()((set) => ({
  drawBoard: "",
  setDrawBoard: (drawBoard) => set({ drawBoard }),
  drawBoardYdoc: new Y.Doc(),
  setDrawBoardYdoc: (drawBoardYdoc) => set({ drawBoardYdoc }),
  drawIsShared: false,
  setDrawIsShared: (drawIsShared) => set({ drawIsShared }),

  note: "",
  setNote: (note) => set({ note }),
  noteYdoc: new Y.Doc(),
  setNoteYdoc: (noteYdoc) => set({ noteYdoc }),
  noteIsShared: true,
  setNoteIsShared: (noteIsShared) => set({ noteIsShared }),

  chatIsShared: true,
  setChatIsShared: (chatIsShared) => set({chatIsShared}),

  voice: "",
  setVoice: (voice) => set({ voice }),
  voiceIsShared: true,
  setVoiceIsShared: (voiceIsShared) => set({ voiceIsShared }),

  canShared: false,
  setCanShared: (canShared) => set({ canShared }),
}));
