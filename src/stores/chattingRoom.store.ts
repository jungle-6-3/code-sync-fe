import { create } from "zustand";

interface MessageStore {
  isMessage: string;
  setIsMessage: (page: string) => void;
}

const chattingRoomStore = create<MessageStore>((set) => ({
  isMessage: "folder",
  setIsMessage: (page) => set({ isMessage: page }),
}));

export default chattingRoomStore;
