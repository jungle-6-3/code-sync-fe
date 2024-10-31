import { create } from "zustand";

interface MessageStore {
  isMessage: string;
  setLeftSNBSelection: (page: string) => void;
}

const chattingRoomStore = create<MessageStore>((set) => ({
  isMessage: "folder",
  setLeftSNBSelection: (page) => set({ isMessage: page }),
}));

export default chattingRoomStore;
