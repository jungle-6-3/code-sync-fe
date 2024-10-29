import { create } from "zustand";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

interface YjsStore {
  ydoc: Y.Doc;
  provider: WebsocketProvider | null;
  binding: MonacoBinding | null;
  setProvider: (provider: WebsocketProvider) => void;
  setBinding: (binding: MonacoBinding) => void;
}

export const yjsStore = create<YjsStore>()((set) => ({
  ydoc: new Y.Doc(),
  provider: null,
  binding: null,
  setProvider: (provider: WebsocketProvider) => set({ provider }),
  setBinding: (binding: MonacoBinding) => set({ binding }),
}));
