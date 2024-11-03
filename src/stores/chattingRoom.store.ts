import { create } from "zustand";

type LeftSection = "folder" | "chat" | "";
interface MessageStore {
  leftSection: LeftSection;
  setLeftSNBSelection: (page: LeftSection) => void;
}

const chattingRoomStore = create<MessageStore>((set, get) => ({
  leftSection: "folder",
  setLeftSNBSelection: (page) => {
    const prevSection = get().leftSection;
    set({
      leftSection: prevSection === page ? "" : page,
    })
  },
}));

export default chattingRoomStore;
