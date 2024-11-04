import { create } from "zustand";

interface MessageStore {
  isMessage: boolean;
  setLeftSNBSelection: (page: boolean) => void;
}

const chattingRoomStore = create<MessageStore>((set) => ({
  isMessage: false,
  setLeftSNBSelection: (page: boolean) => set({ isMessage: page }),
}));

export default chattingRoomStore;
