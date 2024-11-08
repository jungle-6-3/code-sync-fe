import { create } from "@/lib/zustand";

interface Information {
  email: string;
  name: string;
  setUserInformation: (email: string, name: string) => void;
}

const userInformationStore = create<Information>()((set) => ({
  email: "",
  name: "",
  setUserInformation: (email, name) => set({ email, name }),
}));

export default userInformationStore;
