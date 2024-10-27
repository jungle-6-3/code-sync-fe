
import { create } from "zustand";
import Peer, { MediaConnection, PeerConnectOption } from "peerjs";

interface peerStore {
  createPeer: () => Promise<{ peer: Peer, id: string }>;
  connect: (id: string, peerConnectionOptions?: PeerConnectOption) => void;
  disconnect: () => void;
  isConnected: boolean;
  peer?: Peer;
  peers: Record<string, MediaConnection>;
  setPeers: (peers: Record<string, MediaConnection>) => void;
  peerId?: string;
}

export const peerStore = create<peerStore>((set, get) => ({
  peers: {},
  createPeer: () => {
    return new Promise((resolve) => {
      let peer = get().peer;
      if (peer !== undefined) {
        return Promise.resolve({ peer, id: get().peerId });
      }
      peer = new Peer();
      peer.once("open", (id) => {
        set({ peer, peerId: id });
        resolve({ peer, id });
      });
    });
  },
  connect: (id, peerConnectionOptions) => {
    const peer = peerStore.getState().peer;
    if (!peer) {
      return;
    }
    peer.connect(id, peerConnectionOptions);
  },
  disconnect: () => {
    const peer = peerStore.getState().peer;
    if (peer === undefined) {
      return;
    }

    peer.disconnect();
    peer.destroy();
    set({ peer: undefined });
  },
  setPeers: (peers) => set({ peers }),
  isConnected: false,
}));