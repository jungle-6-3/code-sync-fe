import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { create } from 'zustand';

interface YjsStore {
  ydoc: Y.Doc;
  provider?: WebsocketProvider;
  setProvider: (provider: WebsocketProvider) => void;
}

export const yjsStore = create<YjsStore>((set) => ({
  ydoc: new Y.Doc(),
  setProvider: (provider) => set({ provider }),
}));