import { create } from "zustand";

type LeftSection = "folder" | "chat" | "";
type bottomSection = "commit" | "";

interface SectionSelectStore {
  leftSection: LeftSection;
  setLeftSNBSelection: (page: LeftSection) => void;
  bottomSection: bottomSection;
  setBottomSection: (page: bottomSection) => void;
}

export const sectionSelectStore = create<SectionSelectStore>((set, get) => ({
  leftSection: "folder",
  setLeftSNBSelection: (page) => {
    const prevSection = get().leftSection;
    set({
      leftSection: prevSection === page ? "" : page,
    })
  },
  bottomSection: "commit",
  setBottomSection: (page) => {
    const prevSection = get().bottomSection;
    set({
      bottomSection: prevSection === page ? "" : page,
    })
  },
}));
