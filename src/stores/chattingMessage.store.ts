import { create } from "@/lib/zustand";

interface Chatting {
  date: Date;
  name: string;
  message: string;
}

interface ChattingStore {
  messages: Chatting[];
  addMessage: ({ date, name, message }: Chatting) => void;
}

interface ChattingPreviewStore {
  messages: Chatting[];
  addMessage: ({ date, name, message }: Chatting) => void;
  clearMessages: () => void;
}

export const chattingMessageStore = create<ChattingStore>()((set) => ({
  messages: [],
  addMessage: ({ date, name, message }: Chatting) =>
    set((state) => ({
      messages: [...state.messages, { date, name, message }],
    })),
}));

export const chattingPreviewStore = create<ChattingPreviewStore>()((set) => ({
  messages: [],
  addMessage: ({ date, name, message }: Chatting) =>
    set({
      messages: [{ date, name, message }],
    }),
  clearMessages: () => set({ messages: [] }),
}));
