
import { create } from "zustand";
import Peer, { MediaConnection, PeerConnectOption } from "peerjs";

interface peerStore {
  createPeer: () => void;
  connect: (id: string, peerConnectionOptions?: PeerConnectOption) => void;
  disconnect: () => void;
  isConnected: boolean;
  peer?: Peer;
  peers: Record<string, MediaConnection>;
  peerId?: string;
}

export const peerStore = create<peerStore>((set) => ({
  peers: {},
  createPeer: () => {
    const peer = new Peer();
    peer.on("open", (id) => {
      set({ peer, peerId: id });
      peer.on("connection", () => {
        set({ isConnected: true });
      });
      peer.on("disconnected", () => {
        set({ isConnected: false });
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
  isConnected: false,
}));