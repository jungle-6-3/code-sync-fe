import { create } from "@/lib/zustand";
import * as Y from "yjs";

interface Chatting {
  date: string;
  name: string;
  message: string;
  email: string;
}

interface PreviousRoomStore {
  title: string;
  setTitle: (title: string) => void;

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

  chat: Chatting[];
  setChat: (chat: Chatting[]) => void;
  chatIsShared: boolean;
  setChatIsShared: (chatIsShared: boolean) => void;

  voice: Chatting[];
  setVoice: (voice: Chatting[]) => void;
  voiceIsShared: boolean;
  setVoiceIsShared: (voiceIsShared: boolean) => void;

  canShared: boolean;
  setCanShared: (canShared: boolean) => void;
}

export const usePreviousRoomStore = create<PreviousRoomStore>()((set) => ({
  title: "",
  setTitle: (title) => set({ title }),

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

  chat: [],
  setChat: (chat: Chatting[]) => set({ chat }),
  chatIsShared: true,
  setChatIsShared: (chatIsShared) => set({ chatIsShared }),

  voice: [],
  setVoice: (voice: Chatting[]) => set({ voice }),
  voiceIsShared: true,
  setVoiceIsShared: (voiceIsShared) => set({ voiceIsShared }),

  canShared: false,
  setCanShared: (canShared) => set({ canShared }),
}));
