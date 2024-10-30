import { create } from "zustand";

interface Chatting {
  date: Date;
  name: string;
  message: string;
}

interface ChattingStore {
  messages: Chatting[];
  addMessage: (date: Date, name: string, message: string) => void;
}

export const chattingMessageStore = create<ChattingStore>((set) => ({
  messages: [],
  addMessage: (date, name, message) =>
    set((state) => ({
      messages: [...state.messages, { date, name, message }],
    })),
}));
